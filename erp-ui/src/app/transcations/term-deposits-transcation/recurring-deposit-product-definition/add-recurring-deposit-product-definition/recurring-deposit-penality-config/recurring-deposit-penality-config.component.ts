import { Component, ViewChild } from '@angular/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { RecurringDepositProductDefinition } from '../../shared/recurring-deposit-product-definition.model';
import { Table } from 'primeng/table';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecurringDepositPenalityConfig } from './shared/recurring-deposit-penality-config.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { DatePipe } from '@angular/common';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { ActivatedRoute } from '@angular/router';
import { RecurringDepositProductDefinitionService } from '../../shared/recurring-deposit-product-definition.service';
import { RecurringDepositPenalityConfigService } from './shared/recurring-deposit-penality-config.service';

@Component({
  selector: 'app-recurring-deposit-penality-config',
  templateUrl: './recurring-deposit-penality-config.component.html',
  styleUrls: ['./recurring-deposit-penality-config.component.css']
})
export class RecurringDepositPenalityConfigComponent {
  @ViewChild('dt', { static: applicationConstants.FALSE }) private dt!: Table;
  date: Date | undefined;
  penalityConfigList: any[] = [];
  displayDialog: boolean = applicationConstants.FALSE;
  penalityConfigForm: FormGroup;
  newRow :any =null;
  editDeleteDisable:boolean = applicationConstants.FALSE;
  addButton:boolean = applicationConstants.FALSE;
  recurringDepositPenalityConfigModel :RecurringDepositPenalityConfig = new RecurringDepositPenalityConfig();
  recurringDepositProductDefinitionModel :RecurringDepositProductDefinition = new RecurringDepositProductDefinition();
  maxDate = new Date();
  orgnizationSetting:any;
  isEdit: any;
  rdProductId: any;
  msgs: any[]=[];
  responseModel!: Responsemodel;
  enableSaveAndNextButton: boolean = applicationConstants.FALSE;
  amountAndTenureFlag: boolean = applicationConstants.TRUE;
  constructor(private formBuilder: FormBuilder,private commonComponent: CommonComponent,private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,private commonFunctionService: CommonFunctionsService,private encryptService: EncryptDecryptService,
    private recurringDepositProductDefinitionService : RecurringDepositProductDefinitionService,
    private  recurringDepositPenalityConfigService : RecurringDepositPenalityConfigService
  )
  { 
    this.penalityConfigForm = this.formBuilder.group({
      'minAmount': new FormControl('',Validators.required),
      'maxAmount': new FormControl('',Validators.required),
      'penaltyAmount': new FormControl('',Validators.required),
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
  
    this.penalityConfigForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.penalityConfigForm.valid) {
        this.save();
      }
    });
  }
  /**
    @author vinitha
    @implements Integrating Recurring Deposit Configuration details To Main Stepper Component
   */
  updateData() {
    this.recurringDepositPenalityConfigModel.rdProductId = this.rdProductId
    this.recurringDepositProductDefinitionService.changeData({
      formValid: this.enableSaveAndNextButton ,
      data: this.recurringDepositPenalityConfigModel,
      savedId:this.rdProductId,
      stepperIndex: 2,
      isDisable: !this.penalityConfigForm.valid ? applicationConstants.TRUE:applicationConstants.FALSE,
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
    this.newRow = {minAmount: '', maxAmount: '', penaltyAmount: '', }
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
    this.penalityConfigList=[]
    this.recurringDepositProductDefinitionService.getRecurringDepositProductDefinitionOverviewDetailsById(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
        this.recurringDepositProductDefinitionModel = this.responseModel.data[0];
        if (this.recurringDepositProductDefinitionModel != null && this.recurringDepositProductDefinitionModel != undefined) {

          if(null!=this.recurringDepositProductDefinitionModel.effectiveStartDate && undefined!=this.recurringDepositProductDefinitionModel.effectiveStartDate)
            this.recurringDepositProductDefinitionModel.effectiveStartDate = this.datePipe.transform(this.recurringDepositProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
          
        if (this.recurringDepositProductDefinitionModel.penaltyConfigList != null && this.recurringDepositProductDefinitionModel.penaltyConfigList != undefined &&
            this.recurringDepositProductDefinitionModel.penaltyConfigList.length > 0) {

              this.enableSaveAndNextButton = applicationConstants.TRUE;

          this.penalityConfigList = this.recurringDepositProductDefinitionModel.penaltyConfigList;

        
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
  if(null != this.recurringDepositPenalityConfigModel.rdProductId && undefined!=this.recurringDepositPenalityConfigModel.rdProductId)
    rowData.rdProductId = this.recurringDepositPenalityConfigModel.rdProductId;
  this.addButton = applicationConstants.FALSE;
  this.editDeleteDisable = applicationConstants.FALSE;
 

   if(rowData.id != null)
    {
        this.recurringDepositPenalityConfigService.updateRecurringDepositPenalityConfig(rowData).subscribe((response: any) => {
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
     this.recurringDepositPenalityConfigService.addRecurringDepositPenalityConfig(rowData).subscribe((response: any) => {
       this.responseModel = response;
       if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
        if (this.responseModel != null&& this.responseModel.data!= undefined) {

        
        this.penalityConfigList.unshift(this.responseModel.data[0]);
        this.penalityConfigList.splice(1, 1);
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
   checkForAmount(): void {
    const minAmount = this.penalityConfigForm.get('minAmount')?.value;
    const maxAmount = this.penalityConfigForm.get('maxAmount')?.value;

    if (minAmount && maxAmount &&  minAmount >=maxAmount) {
      this.amountAndTenureFlag = applicationConstants.FALSE;
      this.msgs = [{ severity: 'error', detail: applicationConstants.MIN_AMOUNT_ERROR }];
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
