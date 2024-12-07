import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecurringDepositProductDefinition } from '../../shared/recurring-deposit-product-definition.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { ActivatedRoute } from '@angular/router';
import { RecurringDepositProductDefinitionService } from '../../shared/recurring-deposit-product-definition.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-recurring-deposit-general-config',
  templateUrl: './recurring-deposit-general-config.component.html',
  styleUrls: ['./recurring-deposit-general-config.component.css']
})
export class RecurringDepositGeneralConfigComponent {
  generalconfigform: FormGroup;
  recurringDepositProductDefinitionModel :RecurringDepositProductDefinition = new RecurringDepositProductDefinition();
  orgnizationSetting:any;
  isEdit: any;
  maxDate = new Date();
  minDate = new Date();
  responseModel!: Responsemodel;
  savedID: any;
  msgs: any[] = [];
  isSpecialSchemelist: any[] = [];
  amountAndTenureFlag: boolean = applicationConstants.TRUE;
  constructor(private formBuilder: FormBuilder,private commonComponent: CommonComponent,private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,private encryptService: EncryptDecryptService,
    private recurringDepositProductDefinitionService : RecurringDepositProductDefinitionService,
  )
  { 
    this.generalconfigform = this.formBuilder.group({
     'name': new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS),Validators.required]),
     'isSpecialScheme': new FormControl('', Validators.required),
     'minDepositAmount': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_DECIMALS),Validators.required]),
     'maxDepositAmount': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_DECIMALS),Validators.required]),
     'minTenure': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_NEW_NUMBERS),Validators.required]),
     'maxTenure': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_NEW_NUMBERS),Validators.required]),
     'isAutoRenewal': new FormControl('', Validators.required),
     'effectiveStartDate': new FormControl('', Validators.required),
    })    
  }
  /**
    @author vinitha
    @implements Recurring Deposit Configuration details 
    @argument ProductId
    @returns Recurring Deposit Configuration details  if already exist
   */
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.isSpecialSchemelist = this.commonComponent.requiredlist();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let queryParams = params['id'].split('#');
        let id = this.encryptService.decrypt(params['id']);

        if (id != "" && id != null && id != undefined) {
          this.isEdit = applicationConstants.TRUE;
          this.recurringDepositProductDefinitionService.getRecurringDepositProductDefinitionOverviewDetailsById(id).subscribe(res => {
            this.responseModel = res;
            if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
              this.recurringDepositProductDefinitionModel = this.responseModel.data[0];
              if (this.recurringDepositProductDefinitionModel != null && this.recurringDepositProductDefinitionModel != undefined) {
                if(this.recurringDepositProductDefinitionModel.effectiveStartDate != null && this.recurringDepositProductDefinitionModel.effectiveStartDate != undefined ){
                  this.recurringDepositProductDefinitionModel.effectiveStartDate=this.datePipe.transform(this.recurringDepositProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
                 
                }
              }
            this.commonComponent.stopSpinner();
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
      } 
    })
    this.generalconfigform.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.generalconfigform.valid) {
        this.save();
      }
    });
  }

  /**
    @author vinitha
    @implements Integrating Recurring Deposit Configuration details To Main Stepper Component
    @argument RecurringDepositProductDefinitionModel, generalconfigform.valid
   */
  updateData() {
    this.recurringDepositProductDefinitionService.changeData({
      formValid: this.generalconfigform.valid && this.amountAndTenureFlag,
      data: this.recurringDepositProductDefinitionModel,
      stepperIndex: 0,
      
    });
  }
  /**
    @author vinitha
    @implements To Call update Data function to integrate data to main stepper
   */
  save() {
    this.updateData();
  }

  checkForAmount(){
    if(null != this.recurringDepositProductDefinitionModel && undefined!=this.recurringDepositProductDefinitionModel &&
      null != this.recurringDepositProductDefinitionModel.minDepositAmount && undefined!=this.recurringDepositProductDefinitionModel.minDepositAmount &&
      null != this.recurringDepositProductDefinitionModel.maxDepositAmount && undefined!=this.recurringDepositProductDefinitionModel.maxDepositAmount &&
      this.recurringDepositProductDefinitionModel.minDepositAmount >= this.recurringDepositProductDefinitionModel.maxDepositAmount
    ){
      this.amountAndTenureFlag = applicationConstants.FALSE;
      this.msgs = [];
      this.msgs =[{ severity: 'error', detail: applicationConstants.MIN_DEPOSIT_AMOUNT_ERROR }];
    }else if(null != this.recurringDepositProductDefinitionModel && undefined!=this.recurringDepositProductDefinitionModel &&
      null != this.recurringDepositProductDefinitionModel.minTenure && undefined != this.recurringDepositProductDefinitionModel.minTenure &&
      null != this.recurringDepositProductDefinitionModel.maxTenure && undefined != this.recurringDepositProductDefinitionModel.maxTenure &&
      this.recurringDepositProductDefinitionModel.minTenure >= this.recurringDepositProductDefinitionModel.maxTenure
    ){
      this.amountAndTenureFlag = applicationConstants.FALSE;
      this.msgs = [];
      this.msgs =[{ severity: 'error', detail: applicationConstants.MIN_TENURE_AMOUNT_ERROR }];
    }else{
      this.msgs = [];
      this.amountAndTenureFlag = applicationConstants.TRUE;
    }
    this.updateData();
  }
}
