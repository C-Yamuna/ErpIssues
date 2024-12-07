import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DailyDepositsProductDefinition } from '../../shared/daily-deposits-product-definition.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { DailyDepositsProductDefinitionService } from '../../shared/daily-deposits-product-definition.service';

@Component({
  selector: 'app-general-config',
  templateUrl: './general-config.component.html',
  styleUrls: ['./general-config.component.css']
})
export class GeneralConfigComponent {
  generalconfigform: FormGroup;
  dailyDepositsProductDefinitionModel:DailyDepositsProductDefinition = new DailyDepositsProductDefinition();
  orgnizationSetting:any;
  isEdit: any;
  maxDate = new Date();
  minDate = new Date();
  responseModel!: Responsemodel;
  savedID: any;
  msgs: any[] = [];
  isSpecialSchemelist: any[] = [];
  amountAndTenureFlag: boolean = applicationConstants.TRUE;
  constructor(private formBuilder: FormBuilder,
    private commonComponent: CommonComponent,
    private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private encryptService: EncryptDecryptService,
    private dailyDepositsProductDefinitionService: DailyDepositsProductDefinitionService,
  )
  { 
    this.generalconfigform = this.formBuilder.group({
     'name': new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS),Validators.required]),
    //  'isSpecialScheme': new FormControl('', Validators.required),
     'minDepositAmount': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_DECIMALS),Validators.required]),
     'maxDepositAmount': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_DECIMALS),Validators.required]),
     'minTenure': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_NEW_NUMBERS),Validators.required]),
     'maxTenure': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_NEW_NUMBERS),Validators.required]),
    //  'isAutoRenewal': new FormControl('', Validators.required),
     'effectiveStartDate': new FormControl('', Validators.required),
    })    
  }
  /**
    @author bhargavi
    @implements Daily Deposit Configuration details 
    @argument ProductId
    @returns Daily Deposit Configuration details  if already exist
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
          this.dailyDepositsProductDefinitionService.getDailyDepositsProductDefinitionById(id).subscribe(res => {
            this.responseModel = res;
            if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
              this.dailyDepositsProductDefinitionModel = this.responseModel.data[0];
              if (this.dailyDepositsProductDefinitionModel != null && this.dailyDepositsProductDefinitionModel != undefined) {
                if(this.dailyDepositsProductDefinitionModel.effectiveStartDate != null && this.dailyDepositsProductDefinitionModel.effectiveStartDate != undefined ){
                  this.dailyDepositsProductDefinitionModel.effectiveStartDate=this.datePipe.transform(this.dailyDepositsProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
                 
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
    @author bhargavi
    @implements Integrating Daily Deposit Configuration details To Main Stepper Component
    @argument dailyDepositsProductDefinitionModel, generalconfigform.valid
   */
  updateData() {
    this.dailyDepositsProductDefinitionService.changeData({
      formValid: this.generalconfigform.valid && this.amountAndTenureFlag,
      data: this.dailyDepositsProductDefinitionModel,
      stepperIndex: 0,
      
    });
  }
  /**
    @author bhargavi
    @implements To Call update Data function to integrate data to main stepper
   */
  save() {
    this.updateData();
  }

  checkForAmount(){
    if(null != this.dailyDepositsProductDefinitionModel && undefined!=this.dailyDepositsProductDefinitionModel &&
      null != this.dailyDepositsProductDefinitionModel.minDepositAmount && undefined!=this.dailyDepositsProductDefinitionModel.minDepositAmount &&
      null != this.dailyDepositsProductDefinitionModel.maxDepositAmount && undefined!=this.dailyDepositsProductDefinitionModel.maxDepositAmount &&
      this.dailyDepositsProductDefinitionModel.minDepositAmount >= this.dailyDepositsProductDefinitionModel.maxDepositAmount
    ){
      this.amountAndTenureFlag = applicationConstants.FALSE;
      this.msgs = [];
      this.msgs =[{ severity: 'error', detail: applicationConstants.MIN_DEPOSIT_AMOUNT_ERROR }];
    }else if(null != this.dailyDepositsProductDefinitionModel && undefined!=this.dailyDepositsProductDefinitionModel &&
      null != this.dailyDepositsProductDefinitionModel.minTenure && undefined != this.dailyDepositsProductDefinitionModel.minTenure &&
      null != this.dailyDepositsProductDefinitionModel.maxTenure && undefined != this.dailyDepositsProductDefinitionModel.maxTenure &&
      this.dailyDepositsProductDefinitionModel.minTenure >= this.dailyDepositsProductDefinitionModel.maxTenure
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
