import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { RecurringDepositProductDefinition } from '../../shared/recurring-deposit-product-definition.model';
import { Table } from 'primeng/table';
import { RecurringDepositInterestPolicy } from './shared/recurring-deposit-interest-policy.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { DatePipe } from '@angular/common';
import { CommonComponent } from 'src/app/shared/common.component';
import { ActivatedRoute } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { RecurringDepositProductDefinitionService } from '../../shared/recurring-deposit-product-definition.service';
import { RecurringDepositInterestPolicyService } from './shared/recurring-deposit-interest-policy.service';

@Component({
  selector: 'app-recurring-deposit-interest-policy',
  templateUrl: './recurring-deposit-interest-policy.component.html',
  styleUrls: ['./recurring-deposit-interest-policy.component.css']
})
export class RecurringDepositInterestPolicyComponent {
  @ViewChild('dt', { static: applicationConstants.FALSE }) private dt!: Table;
  date: Date | undefined;
  intrestpolicyList: any[] = [];
  displayDialog: boolean = applicationConstants.FALSE;
  interestPolicyForm: FormGroup;
  newRow :any =null;
  editDeleteDisable:boolean = applicationConstants.FALSE;
  addButton:boolean = applicationConstants.FALSE;
  recurringDepositInterestPolicyModel :RecurringDepositInterestPolicy = new RecurringDepositInterestPolicy();
  recurringDepositProductDefinitionModel :RecurringDepositProductDefinition = new RecurringDepositProductDefinition();
  maxDate = new Date();
  minDate = new Date();
  orgnizationSetting:any;
  isEdit: any;
  rdProductId: any;
  msgs: any[]=[];
  responseModel!: Responsemodel;
  enableSaveAndNextButton: boolean = applicationConstants.FALSE;
  constructor(private formBuilder: FormBuilder,private commonComponent: CommonComponent,private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,private commonFunctionService: CommonFunctionsService,private encryptService: EncryptDecryptService,
    private recurringDepositProductDefinitionService : RecurringDepositProductDefinitionService,
    private  recurringDepositInterestPolicyService : RecurringDepositInterestPolicyService
  )
  { 
    this.interestPolicyForm = this.formBuilder.group({
      'roi': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_NUMBERS_TWO_DECIMALS),Validators.required]),
      'staffRoi': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_NUMBERS_TWO_DECIMALS),Validators.required]),
      'seniorCitizenRoi': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_NUMBERS_TWO_DECIMALS),Validators.required]),
      'penaltyRoi': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_NUMBERS_TWO_DECIMALS),Validators.required]),
    });
  }
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.activateRoute.queryParams.subscribe(params => {
      let encrypted = params['id'];
      if (encrypted!= undefined) {
        this.isEdit = applicationConstants.TRUE;
        this.rdProductId = Number(this.encryptService.decrypt(encrypted));
          this.getRecurringDepositinterestpolicyDetails(this.rdProductId);
      } else {
        this.isEdit = applicationConstants.FALSE;
      }
      this.updateData();
    });
  
    this.interestPolicyForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.interestPolicyForm.valid) {
        this.save();
      }
    });
  }
  /**
    @author vinitha
    @implements Integrating Recurring Deposit Configuration details To Main Stepper Component
   */
  updateData() {
    this.recurringDepositInterestPolicyModel.rdProductId = this.rdProductId
    this.recurringDepositProductDefinitionService.changeData({
      formValid: this.enableSaveAndNextButton ,
      data: this.recurringDepositInterestPolicyModel,
      savedId:this.rdProductId,
      stepperIndex: 1,
      isDisable: !this.interestPolicyForm.valid ? applicationConstants.TRUE:applicationConstants.FALSE,
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
    this.editDeleteDisable = applicationConstants.TRUE;
    this.addButton = applicationConstants.TRUE;
    this.dt._first = 0;
    this.dt.value.unshift(this.newRow);
    this.dt.initRowEdit(this.dt.value[0]);
    this.enableSaveAndNextButton = applicationConstants.FALSE;  
    this.updateData();
  }

  addNewEntry()
  {
    this.newRow = {roi: '', staffRoi: '', seniorCitizenRoi: '',penaltyRoi: '',}
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
    @implements Recurring Deposit Configuration details 
    @argument ProductId
   */
  getRecurringDepositinterestpolicyDetails(id: any) {
    this.isEdit = applicationConstants.TRUE;
    this.intrestpolicyList=[]
    this.recurringDepositProductDefinitionService.getRecurringDepositProductDefinitionOverviewDetailsById(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
        this.recurringDepositProductDefinitionModel = this.responseModel.data[0];
        if (this.recurringDepositProductDefinitionModel != null && this.recurringDepositProductDefinitionModel != undefined) {

          if(null!=this.recurringDepositProductDefinitionModel.effectiveStartDate && undefined!=this.recurringDepositProductDefinitionModel.effectiveStartDate)
            this.recurringDepositProductDefinitionModel.effectiveStartDate = this.datePipe.transform(this.recurringDepositProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
          
        if (this.recurringDepositProductDefinitionModel.intestPolicyConfigList != null && this.recurringDepositProductDefinitionModel.intestPolicyConfigList != undefined &&
            this.recurringDepositProductDefinitionModel.intestPolicyConfigList.length > 0) {

              this.enableSaveAndNextButton = applicationConstants.TRUE;

          this.intrestpolicyList = this.recurringDepositProductDefinitionModel.intestPolicyConfigList;

        
       
        }else{
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
  @implements It Saves the Recurring Deposit Interest Policy data 
    @argument ProductId
   */
  saveInlineRow(rowData: any) {
  if(null != this.recurringDepositInterestPolicyModel.rdProductId && undefined!=this.recurringDepositInterestPolicyModel.rdProductId)
    rowData.rdProductId = this.recurringDepositInterestPolicyModel.rdProductId;
  this.addButton = applicationConstants.FALSE;
  this.editDeleteDisable = applicationConstants.FALSE;
  

   if(rowData.id != null)
    {
        this.recurringDepositInterestPolicyService.updateRecurringDepositInterestPolicy(rowData).subscribe((response: any) => {
          this.responseModel = response;
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
            if (this.responseModel != null&& this.responseModel.data!= undefined) {

             
            if(null != rowData.rdProductId && undefined!=rowData.rdProductId)
             this.getRecurringDepositinterestpolicyDetails(rowData.rdProductId);
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
     this.recurringDepositInterestPolicyService.addRecurringDepositInterestPolicy(rowData).subscribe((response: any) => {
       this.responseModel = response;
       if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
        if (this.responseModel != null&& this.responseModel.data!= undefined) {

     
        this.intrestpolicyList.unshift(this.responseModel.data[0]);
        this.intrestpolicyList.splice(1, 1);
        if(null != rowData.rdProductId && undefined!=rowData.rdProductId)
          this.getRecurringDepositinterestpolicyDetails(rowData.rdProductId);
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
}
