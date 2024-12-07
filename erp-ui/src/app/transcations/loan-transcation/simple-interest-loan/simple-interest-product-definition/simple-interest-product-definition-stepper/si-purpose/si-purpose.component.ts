import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { SiPurpose } from './shared/si-purpose.model';
import { SimpleInterestProductDefinition } from '../../shared/simple-interest-product-definition.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { DatePipe } from '@angular/common';
import { LoanPurposeService } from 'src/app/configurations/loan-config/loan-purpose/shared/loan-purpose.service';
import { SiPurposeService } from './shared/si-purpose.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { ActivatedRoute } from '@angular/router';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { SimpleInterestProductDefinitionService } from '../../shared/simple-interest-product-definition.service';

@Component({
  selector: 'app-si-purpose',
  templateUrl: './si-purpose.component.html',
  styleUrls: ['./si-purpose.component.css']
})
export class SiPurposeComponent {
  @ViewChild('dt', { static: false }) private dt!: Table;
  purposeList: any[] = [];
  displayDialog: boolean = applicationConstants.FALSE;
  purposeForm: FormGroup;
  newRow :any =null;
  editDeleteDisable:boolean = applicationConstants.FALSE;
  addButton:boolean = applicationConstants.FALSE;
  siPurposeModel :SiPurpose = new SiPurpose();
  simpleInterestProductDefinitionModel :SimpleInterestProductDefinition = new SimpleInterestProductDefinition();
  maxDate = new Date();
  minDate = new Date();
  orgnizationSetting:any;
  isEdit: any;
  siProductId: any;
  msgs: any[]=[];
  responseModel!: Responsemodel;
  enableSaveAndNextButton: boolean = applicationConstants.FALSE;
  amountAndTenureFlag: boolean = applicationConstants.TRUE;
  purposeTypeList: any[]=[];
  constructor(private formBuilder: FormBuilder,private commonComponent: CommonComponent,private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,private commonFunctionService: CommonFunctionsService,private encryptService: EncryptDecryptService,
    private simpleInterestProductDefinitionService : SimpleInterestProductDefinitionService, private siPurposeService :SiPurposeService,
    private loanPurposeService : LoanPurposeService
  )
  { 
    this.purposeForm = this.formBuilder.group({
      'purposeId': new FormControl('', Validators.required),
      'minGesitationPeriod': new FormControl('',),
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
       
        this.siProductId = Number(this.encryptService.decrypt(encrypted));
          this.getPreviewDetailsByProductId(this.siProductId);
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
    this.getAllPurposeTypes();
  }
 /**
    @author vinitha
    @implements Integrating SI Loans Configuration details To Main Stepper Component
   */
  updateData() {
    this.siPurposeModel.siProductId = this.siProductId
    this.simpleInterestProductDefinitionService.changeData({
      formValid: this.enableSaveAndNextButton ,
      data: this.siPurposeModel,
      savedId:this.siProductId,
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
    this.newRow = {purposeId: '',minGesitationPeriod:'',maxGesitationPeriod:'',remarks:''}
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
    @implements SI Loans Configuration details 
    @argument ProductId
   */
getPreviewDetailsByProductId(id: any) {
    this.isEdit = applicationConstants.TRUE;
    this.purposeList=[]
    this.simpleInterestProductDefinitionService.getPreviewDetailsByProductId(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
        this.simpleInterestProductDefinitionModel = this.responseModel.data[0];
        if (this.simpleInterestProductDefinitionModel != null && this.simpleInterestProductDefinitionModel != undefined) {

          if(null!=this.simpleInterestProductDefinitionModel.effectiveStartDate && undefined!=this.simpleInterestProductDefinitionModel.effectiveStartDate)
            this.simpleInterestProductDefinitionModel.effectiveStartDate = this.datePipe.transform(this.simpleInterestProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
          
        if (this.simpleInterestProductDefinitionModel.siProdPurposeConfigDTOList != null && this.simpleInterestProductDefinitionModel.siProdPurposeConfigDTOList != undefined &&
            this.simpleInterestProductDefinitionModel.siProdPurposeConfigDTOList.length > 0) {

              this.enableSaveAndNextButton = applicationConstants.TRUE;

          this.purposeList = this.simpleInterestProductDefinitionModel.siProdPurposeConfigDTOList;

        
        
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
  @implements It Saves the SAO Loans Linked Share Capital data 
    @argument ProductId
   */

  saveInlineRow(rowData: any) {
    if(null != this.siPurposeModel.siProductId && undefined!=this.siPurposeModel.siProductId)
      rowData.siProductId = this.siPurposeModel.siProductId;
    this.addButton = applicationConstants.FALSE;
    this.editDeleteDisable = applicationConstants.FALSE;
   
    this.purposeTypeList.filter((purposetype: any) => purposetype != null && purposetype.value == this.siPurposeModel.purposeId).map((act: { label: any; }) => {
      this.siPurposeModel.loanPurposeName = act.label;
    });
    if (this.purposetypeDuplicateCheck(this.siPurposeModel.purposeId)) {
      return;
    }
  
     if(rowData.id != null)
      {
          this.siPurposeService.updateSiPurpose(rowData).subscribe((response: any) => {
            this.responseModel = response;
            if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
              if (this.responseModel != null&& this.responseModel.data!= undefined) {
  
               
              if(null != rowData.siProductId && undefined!=rowData.siProductId)
               this.getPreviewDetailsByProductId(rowData.siProductId);
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
              this.getPreviewDetailsByProductId(this.siProductId);
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
       this.siPurposeService.addSiPurpose(rowData).subscribe((response: any) => {
         this.responseModel = response;
         if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
          if (this.responseModel != null&& this.responseModel.data!= undefined) {
  
         
          this.purposeList.unshift(this.responseModel.data[0]);
          this.purposeList.splice(1, 1);
          if(null != rowData.siProductId && undefined!=rowData.siProductId)
            this.getPreviewDetailsByProductId(rowData.siProductId);
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
           this.getPreviewDetailsByProductId(this.siProductId);
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
    /* @author vinitha
     @implements get charges types
       @argument ProductId
      */
       getAllPurposeTypes() {
        this.commonComponent.startSpinner();
        this.purposeTypeList =[];
        this.loanPurposeService.getAllLoanPurpose().subscribe((res: any) => {
          this.responseModel = res;
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
            if (this.responseModel.data == null || (this.responseModel.data != null && this.responseModel.data.length == 0)) {
              this.commonComponent.stopSpinner();
              this.msgs = [];
              this.msgs = [{ severity: 'error', detail: applicationConstants.RELATIONSHIP_TYPE_NO_DATA_MESSAGE }];
              setTimeout(() => {
                this.msgs = [];
              }, 2000);
            }else{
              this.purposeTypeList = this.responseModel.data.filter((documenttype:any) => documenttype.status == applicationConstants.ACTIVE).map((count:any) => {
                return { label: count.name, value: count.id }
              });
      
              let purposeType=  this.purposeTypeList.find((data:any) => null != data && data.value ==this.siPurposeModel.purposeId);
              if(purposeType != null && undefined != purposeType)
                 this.siPurposeModel.loanPurposeName = purposeType.label;
              this.commonComponent.stopSpinner();
            }
          } else {
            this.commonComponent.stopSpinner();
            this.msgs = [];
            this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];
            }, 2000);
          }
        },
          error => {
            this.msgs = [];
            this.commonComponent.stopSpinner();
            this.msgs = [{ severity: 'error', detail: applicationConstants.SERVER_DOWN_ERROR }];
            setTimeout(() => {
              this.msgs = [];
            }, 2000);
          });
      }
      purposetypeDuplicateCheck(selectedpurposeType: any) {
        // Check if there is any row in the list with the same purposetypes as the selected one
        const isDuplicate = this.purposeList.some(row => 
          row.purposeId === selectedpurposeType &&
          row.id !== this.siPurposeModel.id  // Exclude the current row being edited (if applicable)
        );
      
        if (isDuplicate) {
          this.purposeForm.get('chargesTypeName')?.reset();
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
          this.msgs = [{ severity: 'error', detail: applicationConstants.MIN_CHARGES_ERROR }];
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
