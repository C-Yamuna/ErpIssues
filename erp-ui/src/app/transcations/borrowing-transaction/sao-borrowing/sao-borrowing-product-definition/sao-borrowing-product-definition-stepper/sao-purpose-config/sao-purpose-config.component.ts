import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { SaoBorrowingProductDefinition } from '../../shared/sao-borrowing-product-definition.model';
import { SaoPurpose } from './shared/sao-purpose.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { SaoBorrowingProductDefinitionService } from '../../shared/sao-borrowing-product-definition.service';
import { SaoPurposeService } from './shared/sao-purpose.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sao-purpose-config',
  templateUrl: './sao-purpose-config.component.html',
  styleUrls: ['./sao-purpose-config.component.css']
})
export class SaoPurposeConfigComponent {
  @ViewChild('dt', { static: false }) private dt!: Table;
  purposeList: any[] = [];
  displayDialog: boolean = applicationConstants.FALSE;
  purposeForm: FormGroup;
  newRow :any =null;
  editDeleteDisable:boolean = applicationConstants.FALSE;
  addButton:boolean = applicationConstants.FALSE;
  saoProductDefinitionModel :SaoBorrowingProductDefinition = new SaoBorrowingProductDefinition();
  saoProdPurposesModel : SaoPurpose = new SaoPurpose();
  maxDate = new Date();
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
    private saoBorrowingProductDefinitionService : SaoBorrowingProductDefinitionService, private saoPurposeService :SaoPurposeService,
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
    @implements Integrating SAO Borrowings Configuration details To Main Stepper Component
   */
  updateData() {
    this.saoProdPurposesModel.productId = this.productId
    this.saoBorrowingProductDefinitionService.changeData({
      formValid: this.enableSaveAndNextButton ,
      data: this.saoProdPurposesModel,
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
    @implements SAO Borrowings Configuration details 
    @argument ProductId
   */
getPreviewDetailsByProductId(id: any) {
    this.isEdit = applicationConstants.TRUE;
    this.purposeList=[]
    this.saoBorrowingProductDefinitionService.getPreviewByProductId(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
        this.saoProductDefinitionModel = this.responseModel.data[0];
        if (this.saoProductDefinitionModel != null && this.saoProductDefinitionModel != undefined) {

          if(null!=this.saoProductDefinitionModel.effectiveStartDate && undefined!=this.saoProductDefinitionModel.effectiveStartDate)
            this.saoProductDefinitionModel.effectiveStartDate = this.datePipe.transform(this.saoProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
          
        if (this.saoProductDefinitionModel.saoProductPurposeConfigDTO != null && this.saoProductDefinitionModel.saoProductPurposeConfigDTO != undefined &&
            this.saoProductDefinitionModel.saoProductPurposeConfigDTO.length > 0) {

              this.enableSaveAndNextButton = applicationConstants.TRUE;

          this.purposeList = this.saoProductDefinitionModel.saoProductPurposeConfigDTO;

        
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
  @implements It Saves the SAO Borrowings Linked Share Capital data 
    @argument ProductId
   */

  saveInlineRow(rowData: any) {
    if(null != this.saoProdPurposesModel.productId && undefined!=this.saoProdPurposesModel.productId)
      rowData.productId = this.saoProdPurposesModel.productId;
    this.addButton = applicationConstants.FALSE;
    this.editDeleteDisable = applicationConstants.FALSE;
    this.purposeTypeList.filter((purposetype: any) => purposetype != null && purposetype.value == this.saoProdPurposesModel.purposeId).map((act: { label: any; }) => {
      this.saoProdPurposesModel.purposeName = act.label;
    });
 
  
     if(rowData.id != null)
      {
          this.saoPurposeService.updateSaoPurpose(rowData).subscribe((response: any) => {
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
       this.saoPurposeService.addSaoPurpose(rowData).subscribe((response: any) => {
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
