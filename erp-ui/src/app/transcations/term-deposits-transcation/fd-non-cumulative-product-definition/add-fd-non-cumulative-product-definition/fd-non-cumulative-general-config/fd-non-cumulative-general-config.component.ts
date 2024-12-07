import { Component } from '@angular/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { FdNonCumulativeProductDefinition } from '../../shared/fd-non-cumulative-product-definition.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { ActivatedRoute } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { FdNonCumulativeProductDefinitionService } from '../../shared/fd-non-cumulative-product-definition.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-fd-non-cumulative-general-config',
  templateUrl: './fd-non-cumulative-general-config.component.html',
  styleUrls: ['./fd-non-cumulative-general-config.component.css']
})
export class FdNonCumulativeGeneralConfigComponent {
  generalconfigform: FormGroup;
  fdNonCumulativeProductDefinitionModel :FdNonCumulativeProductDefinition = new FdNonCumulativeProductDefinition();
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
    private fdNonCumulativeProductDefinitionService:FdNonCumulativeProductDefinitionService
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
          this.isEdit = applicationConstants.TRUE;
          this.fdNonCumulativeProductDefinitionService.getFdNonCumulativeProductDefinitionOverviewDetailsById(id).subscribe(res => {
            this.responseModel = res;
            if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
              this.fdNonCumulativeProductDefinitionModel = this.responseModel.data[0];
              if (this.fdNonCumulativeProductDefinitionModel != null && this.fdNonCumulativeProductDefinitionModel != undefined) {
                if(this.fdNonCumulativeProductDefinitionModel.effectiveStartDate != null && this.fdNonCumulativeProductDefinitionModel.effectiveStartDate != undefined ){
                  this.fdNonCumulativeProductDefinitionModel.effectiveStartDate=this.datePipe.transform(this.fdNonCumulativeProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
                 
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
    @implements Integrating Fd Cummulative Configuration details To Main Stepper Component
    @argument fdNonCumulativeProductDefinitionModel, generalconfigform.valid
   */
  updateData() {
    this.fdNonCumulativeProductDefinitionService.changeData({
      formValid: this.generalconfigform.valid && this.amountAndTenureFlag,
      data: this.fdNonCumulativeProductDefinitionModel,
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
    if(null != this.fdNonCumulativeProductDefinitionModel && undefined!=this.fdNonCumulativeProductDefinitionModel &&
      null != this.fdNonCumulativeProductDefinitionModel.minDepositAmount && undefined!=this.fdNonCumulativeProductDefinitionModel.minDepositAmount &&
      null != this.fdNonCumulativeProductDefinitionModel.maxDepositAmount && undefined!=this.fdNonCumulativeProductDefinitionModel.maxDepositAmount &&
      this.fdNonCumulativeProductDefinitionModel.minDepositAmount >= this.fdNonCumulativeProductDefinitionModel.maxDepositAmount
    ){
      this.amountAndTenureFlag = applicationConstants.FALSE;
      this.msgs = [];
      this.msgs =[{ severity: 'error', detail: applicationConstants.MIN_DEPOSIT_AMOUNT_ERROR }];
    }else if(null != this.fdNonCumulativeProductDefinitionModel && undefined!=this.fdNonCumulativeProductDefinitionModel &&
      null != this.fdNonCumulativeProductDefinitionModel.minTenure && undefined != this.fdNonCumulativeProductDefinitionModel.minTenure &&
      null != this.fdNonCumulativeProductDefinitionModel.maxTenure && undefined != this.fdNonCumulativeProductDefinitionModel.maxTenure &&
      this.fdNonCumulativeProductDefinitionModel.minTenure >= this.fdNonCumulativeProductDefinitionModel.maxTenure
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
