import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { TermPurpose } from './shared/term-purpose.model';
import { TermBorrowingProductDefinition } from '../../shared/term-borrowing-product-definition.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { TermBorrowingProductDefinitionService } from '../../shared/term-borrowing-product-definition.service';
import { TermPurposeService } from './shared/term-purpose.service';

@Component({
  selector: 'app-term-purpose',
  templateUrl: './term-purpose.component.html',
  styleUrls: ['./term-purpose.component.css']
})
export class TermPurposeComponent {
  @ViewChild('dt', { static: false }) private dt!: Table;
  purposeList: any[] = [];
  displayDialog: boolean = applicationConstants.FALSE;
  purposeForm: FormGroup;
  newRow :any =null;
  editDeleteDisable:boolean = applicationConstants.FALSE;
  addButton:boolean = applicationConstants.FALSE;
  termProductDefinitionModel :TermBorrowingProductDefinition = new TermBorrowingProductDefinition();
  termProdPurposesModel : TermPurpose = new TermPurpose();
  minDate = new Date();
  orgnizationSetting:any;
  isEdit: any;
  productId: any;
  msgs: any[]=[];
  responseModel!: Responsemodel;
  enableSaveAndNextButton: boolean = applicationConstants.FALSE;
  amountAndTenureFlag: boolean = applicationConstants.TRUE;
  purposeTypeList: any[]=[];
  constructor(private formBuilder: FormBuilder,private commonComponent: CommonComponent,private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,private commonFunctionService: CommonFunctionsService,private encryptService: EncryptDecryptService,
    private termBorrowingProductDefinitionService : TermBorrowingProductDefinitionService, private termPurposeService :TermPurposeService,
  )
  { 
    this.purposeForm = this.formBuilder.group({
      'purposeId': new FormControl('', ),
      'gesitationPeriod': new FormControl('', Validators.required),
      'maxGesitationPeriod':new FormControl('', Validators.required),
      'remarks':new FormControl('', ),
      
    });
  }
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.activateRoute.queryParams.subscribe(params => {
      let encrypted = params['id'];
      if (encrypted!= undefined) {
        this.isEdit = applicationConstants.TRUE;
       
        this.productId = Number(this.encryptService.decrypt(encrypted));
          this.getPreviewDetailsByProductId(this.productId);
      } else {
        this.isEdit = applicationConstants.FALSE;
      }
      this.updateData();
    });
  
    this.purposeForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.purposeForm.valid) {
        this.save();
      }
    });
  
  }
 /**
    @author vinitha
    @implements Integrating CI Borrowings Configuration details To Main Stepper Component
   */
  updateData() {
    this.termProdPurposesModel.productId = this.productId
    this.termBorrowingProductDefinitionService.changeData({
      formValid: this.enableSaveAndNextButton ,
      data: this.termProdPurposesModel,
      savedId:this.productId,
      stepperIndex: 4,
      isDisable: !this.purposeForm.valid ? applicationConstants.TRUE:applicationConstants.FALSE,
    });
  }
     /**
    @author vinitha
    @implements To Call update Data function to integrate data to main stepper
   */
  save() {
    this.updateData();
  }
  
  addInlineRow() {
    this.addNewEntry();
    this.editDeleteDisable = applicationConstants.TRUE;;
    this.addButton = applicationConstants.TRUE;;
    this.dt._first = 0;
    this.dt.value.unshift(this.newRow);
    this.dt.initRowEdit(this.dt.value[0]);
    this.enableSaveAndNextButton = applicationConstants.FALSE;  
    this.updateData();
  }

  addNewEntry()
  {
    this.newRow = {purposeId: '',gesitationPeriod:'',maxGesitationPeriod:'',remarks:''}
  }
     /**
    @author vinitha
    @implementsRow Row Edit Cancel
   
   */
  onRowEditCancel() {
    this.addButton=applicationConstants.FALSE;
    this.editDeleteDisable = applicationConstants.FALSE;
    this.enableSaveAndNextButton = applicationConstants.TRUE;
    const index = this.dt.value.indexOf(this.newRow);
    if (index > -1) {
      this.dt.value.splice(index, 1);
    }
    this.addNewEntry();
    this.updateData();
  }
/**
    @author vinitha
    @implements edit inline row
   
   */
  editInlineRow(row:any) {
    this.addButton = applicationConstants.TRUE;
    this.editDeleteDisable = applicationConstants.TRUE; 
    this.enableSaveAndNextButton = applicationConstants.FALSE;  
    this.updateData();
  }
 /**
    @author vinitha
    @implements CI Borrowings Configuration details 
    @argument ProductId
   */
getPreviewDetailsByProductId(id: any) {
    this.isEdit = applicationConstants.TRUE;
    this.purposeList=[]
    this.termBorrowingProductDefinitionService.getPreviewByProductId(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
        this.termProductDefinitionModel = this.responseModel.data[0];
        if (this.termProductDefinitionModel != null && this.termProductDefinitionModel != undefined) {

          if(null!=this.termProductDefinitionModel.effectiveStartDate && undefined!=this.termProductDefinitionModel.effectiveStartDate)
            this.termProductDefinitionModel.effectiveStartDate = this.datePipe.transform(this.termProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
          
        if (this.termProductDefinitionModel.termProductPurposeConfigDTO != null && this.termProductDefinitionModel.termProductPurposeConfigDTO != undefined &&
            this.termProductDefinitionModel.termProductPurposeConfigDTO.length > 0) {

              this.enableSaveAndNextButton = applicationConstants.TRUE;

          this.purposeList = this.termProductDefinitionModel.termProductPurposeConfigDTO;

        
        }
        else{
          this.enableSaveAndNextButton = applicationConstants.FALSE;
        }
      }
      this.updateData();
      }else {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    }, error => {
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail:  applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
      this.commonComponent.stopSpinner();
    });
  }
 /**
    @author vinitha
  @implements It Saves the CI Borrowings Linked Share Capital data 
    @argument ProductId
   */

  saveInlineRow(rowData: any) {
    if(null != this.termProdPurposesModel.productId && undefined!=this.termProdPurposesModel.productId)
      rowData.productId = this.termProdPurposesModel.productId;
    this.addButton = applicationConstants.FALSE;
    this.editDeleteDisable = applicationConstants.FALSE;
    
     if(rowData.id != null)
      {
          this.termPurposeService.updateTermPurpose(rowData).subscribe((response: any) => {
            this.responseModel = response;
            if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
              if (this.responseModel != null&& this.responseModel.data!= undefined) {
  
               
              if(null != rowData.productId && undefined!=rowData.productId)
               this.getPreviewDetailsByProductId(rowData.productId);
              this.commonComponent.stopSpinner();
              this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
              setTimeout(() => {
                this.msgs = [];  
              }, 2000);
            }
            } else {
             this.commonComponent.stopSpinner();
              this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
              setTimeout(() => {
                this.msgs = [];  
              }, 2000);
              this.getPreviewDetailsByProductId(this.productId);
            }
          },
            error => {
              this.commonComponent.stopSpinner();
              this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
              setTimeout(() => {
                this.msgs = [];  
              }, 2000);
            });
    } else {
       this.termPurposeService.addTermPurpose(rowData).subscribe((response: any) => {
         this.responseModel = response;
         if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
          if (this.responseModel != null&& this.responseModel.data!= undefined) {
  
          this.purposeList.unshift(this.responseModel.data[0]);
          this.purposeList.splice(1, 1);
          if(null != rowData.productId && undefined!=rowData.productId)
            this.getPreviewDetailsByProductId(rowData.productId);
           this.commonComponent.stopSpinner();
           this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
           setTimeout(() => {
             this.msgs = [];  
           }, 2000);
          }
         } else {
           this.commonComponent.stopSpinner();
           this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
           setTimeout(() => {
             this.msgs = [];  
           }, 2000);
           this.getPreviewDetailsByProductId(this.productId);
         }
       },
         error => {
           this.commonComponent.stopSpinner();
           this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
           setTimeout(() => {
             this.msgs = [];  
           }, 2000);
         });
     }
     }
     purposetypeDuplicateCheck(selectedpurposeType: any) {
      // Check if there is any row in the list with the same purposetypes as the selected one
      const isDuplicate = this.purposeList.some(row => 
        row.purposeId === selectedpurposeType &&
        row.id !== this.termProdPurposesModel.id  // Exclude the current row being edited (if applicable)
      );
    
      if (isDuplicate) {
        this.purposeForm.get('purposeId')?.reset();
        this.msgs = [{ severity: 'error',  summary: applicationConstants.STATUS_ERROR,detail: applicationConstants.PURPOSE_TYPE_ALREADY_EXIST }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
        return applicationConstants.TRUE;
      }
    
      // Otherwise, proceed with the new purposetypes
      return  applicationConstants.FALSE;
    }
    checkForGestationPeriod(){
      const gesitationPeriod = this.purposeForm.get('gesitationPeriod')?.value;
      const maxGesitationPeriod = this.purposeForm.get('maxGesitationPeriod')?.value;
  
      if (gesitationPeriod && maxGesitationPeriod &&  gesitationPeriod >=maxGesitationPeriod) {
        this.amountAndTenureFlag = applicationConstants.FALSE;
        this.msgs = [{ severity: 'error', detail: applicationConstants.GESTATION_PERIOD_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 1500);
      } else {
        this.msgs = [];
        this.amountAndTenureFlag = applicationConstants.TRUE;
      }
  
     
      this.updateData();
    }
}
