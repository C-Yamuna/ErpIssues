import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralConfig } from './shared/general-config.model';
import { DatePipe } from '@angular/common';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { TermDepositProductDefinitionService } from '../../shared/term-deposit-product-definition.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { Responsemodel } from 'src/app/shared/responsemodel';

@Component({
  selector: 'app-general-config',
  templateUrl: './general-config.component.html',
  styleUrls: ['./general-config.component.css']
})
export class GeneralConfigComponent {
  generalconfigform: FormGroup;
  generalConfigModel :GeneralConfig = new GeneralConfig();
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
    private datePipe: DatePipe,private encryptService: EncryptDecryptService,private termDepositProductDefinitionService:TermDepositProductDefinitionService
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
    //  'effectiveEndDate': new FormControl('', Validators.required)
    })
  }
  /**
    @author Phanidher
    @implements Fd Cummulative Configuration details 
    @argument ProductId
    @returns Fd Cummulative Configuration details  if already exist
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
          this.isEdit = true;
          this.termDepositProductDefinitionService.getFdCummulativeById(id).subscribe(res => {
            this.responseModel = res;
            if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
              this.generalConfigModel = this.responseModel.data[0];
              if (this.generalConfigModel != null && this.generalConfigModel != undefined) {
                if(this.generalConfigModel.effectiveStartDate != null && this.generalConfigModel.effectiveStartDate != undefined &&this.generalConfigModel.effectiveStartDate!=null&&this.generalConfigModel.effectiveStartDate!= undefined){
                  this.generalConfigModel.effectiveStartDate=this.datePipe.transform(this.generalConfigModel.effectiveStartDate, this.orgnizationSetting.datePipe);
                 
                }
                if(this.generalConfigModel.effectiveEndDate != null && this.generalConfigModel.effectiveEndDate != undefined &&this.generalConfigModel.effectiveEndDate!=null&&this.generalConfigModel.effectiveEndDate!= undefined){
                  this.generalConfigModel.effectiveEndDate=this.datePipe.transform(this.generalConfigModel.effectiveEndDate, this.orgnizationSetting.datePipe);
                 
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
    @author Phanidher
    @implements Integrating Fd Cummulative Configuration details To Main Stepper Component
    @argument generalConfigModel, generalconfigform.valid
   */
  updateData() {
    this.termDepositProductDefinitionService.changeData({
      formValid: this.generalconfigform.valid && this.amountAndTenureFlag,
      data: this.generalConfigModel,
      stepperIndex: 0,
      
    });
  }
  /**
    @author Phanidher
    @implements To Call update Data function to integrate data to main stepper
   */
  save() {
    this.updateData();
  }

  checkForAmount(){
    if(null!=this.generalConfigModel && undefined!=this.generalConfigModel &&
      null!=this.generalConfigModel.minDepositAmount && undefined!=this.generalConfigModel.minDepositAmount &&
      null!=this.generalConfigModel.maxDepositAmount && undefined!=this.generalConfigModel.maxDepositAmount &&
      this.generalConfigModel.minDepositAmount>=this.generalConfigModel.maxDepositAmount
    ){
      this.amountAndTenureFlag = applicationConstants.FALSE;
      this.msgs = [];
      this.msgs =[{ severity: 'error', detail: applicationConstants.MIN_DEPOSIT_AMOUNT_ERROR }];
    }else if(null!=this.generalConfigModel && undefined!=this.generalConfigModel &&
      null!=this.generalConfigModel.minTenure && undefined!=this.generalConfigModel.minTenure &&
      null!=this.generalConfigModel.maxTenure && undefined!=this.generalConfigModel.maxTenure &&
      this.generalConfigModel.minTenure>=this.generalConfigModel.maxTenure
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
