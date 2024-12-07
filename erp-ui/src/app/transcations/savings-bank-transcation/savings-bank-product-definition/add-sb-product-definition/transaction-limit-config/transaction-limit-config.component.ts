import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralConfig } from '../general-config/shared/general-config.model';
import { InterestPolicy } from '../interest-policy/shared/interest-policy.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { TransactionLimitConfig } from './shared/transaction-limit-config.model';
import { TransactionLimitConfigService } from './shared/transaction-limit-config.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { DatePipe } from '@angular/common';
import { GeneralConfigService } from '../general-config/shared/general-config.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { ProductDefinitionService } from '../shared/product-definition.service';
import { InterestPolicyService } from '../interest-policy/shared/interest-policy.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-transaction-limit-config',
  templateUrl: './transaction-limit-config.component.html',
  styleUrls: ['./transaction-limit-config.component.css']
})
export class TransactionLimitConfigComponent {
  transactionlimitconfigform: FormGroup;
  orgnizationSetting: any;
  productId:any;
  isEdit: any;
  generalConfigModel :GeneralConfig = new GeneralConfig();
  transactionLimitConfigModel:TransactionLimitConfig = new TransactionLimitConfig();
  responseModel!: Responsemodel;
  msgs: any[]=[];
  pacsId:any;
  intpostingfrequencylist: any[]=[];
  maxDate = new Date();
  minDate = new Date();
  constructor(private router: Router, private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute, private encryptService: EncryptDecryptService,
    private datePipe: DatePipe, private commonComponent: CommonComponent,
    private generalConfigService:GeneralConfigService,
    private productDefinitionService:ProductDefinitionService,
   private transactionLimitConfigService:TransactionLimitConfigService
  )
  { 
    this.transactionlimitconfigform = this.formBuilder.group({
      'minDepositLimitPerDayWithPan': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_NUMBERS_ONLY),Validators.required]),
      'minDepositLimitPerDayWithoutPan':new FormControl('', [Validators.pattern(applicationConstants.ALLOW_NUMBERS_ONLY),Validators.required]),
      'maxDepositLimitPerDayWithPan': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_NUMBERS_ONLY),Validators.required]),
      'maxDepositLimitPerDayWithoutPan':new FormControl('', [Validators.pattern(applicationConstants.ALLOW_NUMBERS_ONLY),Validators.required]),
      'minWithdrawLimitPerDayWithPan':new FormControl('', [Validators.pattern(applicationConstants.ALLOW_NUMBERS_ONLY)]),
      'minWithdrawLimitPerDayWithOutPan':new FormControl('', [Validators.pattern(applicationConstants.ALLOW_NUMBERS_ONLY)]),
      'maxWithdrawLimitSameBranchAtmInDay':  new FormControl('', [Validators.pattern(applicationConstants.ALLOW_NUMBERS_ONLY),Validators.required]),
      'maxWithdrawLimitOtherBranchAtmInDay':  new FormControl('', [Validators.pattern(applicationConstants.ALLOW_NUMBERS_ONLY),Validators.required]),
      'maxTransferLimitPerDay': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_NUMBERS_ONLY),Validators.required]),
      'maxWithdrawLimitByCheque': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_NUMBERS_ONLY),Validators.required]),

      'maxWithdrawLimitByDebitCard': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_NUMBERS_ONLY),Validators.required]),
      'maxWithdrawLimitInBranch': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_NUMBERS_ONLY),Validators.required]),

     
    })
  }
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner(); 
        this.productId = Number(this.encryptService.decrypt(params['id']));
        if (this.productId != "" && this.productId != null && this.productId != undefined) {
          this.isEdit = true;
          this.generalConfigService.getGeneralConfigById(this.productId).subscribe(res => {
            this.responseModel = res;
            if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
              this.generalConfigModel = this.responseModel.data[0];
              if (this.generalConfigModel != null && this.generalConfigModel != undefined) {
                if(this.generalConfigModel.effectiveStartDate != null && this.generalConfigModel.effectiveStartDate != undefined &&this.generalConfigModel.effectiveStartDate!=null&&this.generalConfigModel.effectiveStartDate!= undefined){
                  this.generalConfigModel.effectiveStartDate=this.datePipe.transform(this.generalConfigModel.effectiveStartDate, this.orgnizationSetting.datePipe);                
                } 
                if(this.generalConfigModel.transactionLimitConfigDto  != null && this.generalConfigModel.transactionLimitConfigDto  != undefined)
              
                  this.transactionLimitConfigModel = this.generalConfigModel.transactionLimitConfigDto;
  
  
               
              
                
                
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
    this.transactionlimitconfigform.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.transactionlimitconfigform.valid) {
        this.save();
      }
    });
  this.save();
  this.pacsId = 1;
  }
  save() {
    this.updateData();
  }
  updateData() {
    this.transactionLimitConfigModel.productId = this.productId;
    this.productDefinitionService.changeData({
      formValid: this.transactionlimitconfigform.valid ,
      data: this.transactionLimitConfigModel,
      stepperIndex: 2,
    });
  }
  navigateToBack(){
    this.router.navigate([]);
  }

}