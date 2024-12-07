import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { GeneralConfig } from '../general-config/shared/general-config.model';
import { InterestPolicy } from './shared/interest-policy.model';
import { GeneralConfigService } from '../general-config/shared/general-config.service';
import { ProductDefinitionService } from '../shared/product-definition.service';
import { InterestPolicyService } from './shared/interest-policy.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { InterestPostingFrequencyService } from 'src/app/configurations/common-config/interest-posting-frequency/shared/interest-posting-frequency.service';

@Component({
  selector: 'app-interest-policy',
  templateUrl: './interest-policy.component.html',
  styleUrls: ['./interest-policy.component.css']
})
export class InterestPolicyComponent {
  interestpolicyform: FormGroup;
  orgnizationSetting: any;
  productId:any;
  isEdit: any;
  generalConfigModel :GeneralConfig = new GeneralConfig();
  interestPolicyModel : InterestPolicy =new InterestPolicy();
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
    private productDefinitionService:ProductDefinitionService,private interestPolicyService: InterestPolicyService,
    private interestpostingfrequency: InterestPostingFrequencyService
  )
  { 
    this.interestpolicyform = this.formBuilder.group({
      'rateOfInterst': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_NUMBERS_TWO_DECIMALS),Validators.required]),
      'seniorCitizenSpecificRoi':new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_NUMBERS_TWO_DECIMALS),Validators.required]),
      'womenSpecificRoi':new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_NUMBERS_TWO_DECIMALS),Validators.required]),
      'staffRateOfInterest': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_NUMBERS_TWO_DECIMALS),Validators.required]),
      'minInterestPostingAmount':new FormControl('', [Validators.pattern(applicationConstants.ALLOW_NUMBERS_ONLY)]),
      'minSbBalReqForPosting':new FormControl('', [Validators.pattern(applicationConstants.ALLOW_NUMBERS_ONLY),Validators.required]),
      'interestPostingDate': new FormControl('',Validators.required),
      'interestPostingFrequency': new FormControl(''),

      
    })
  }

  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.intpostingfrequencylist = this.commonComponent.rePaymentFrequency();
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
                if(this.generalConfigModel.interestPolicyConfigDto  != null && this.generalConfigModel.interestPolicyConfigDto  != undefined)
             
                  this.interestPolicyModel = this.generalConfigModel.interestPolicyConfigDto;
  
                if(this.interestPolicyModel.interestPostingDate != null && this.interestPolicyModel.interestPostingDate != undefined &&this.interestPolicyModel.interestPostingDate!=null&&this.interestPolicyModel.interestPostingDate!= undefined){
                  this.interestPolicyModel.interestPostingDate=this.datePipe.transform(this.interestPolicyModel.interestPostingDate, this.orgnizationSetting.datePipe);
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
    this.interestpolicyform.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.interestpolicyform.valid) {
        this.save();
      }
    });
  this.save();
  this.pacsId = 1;
  // this.getAllinterestpostingfrequency();
  }
  save() {
    this.updateData();
  }
  updateData() {

this.interestPolicyModel.productId = this.productId;
    this.productDefinitionService.changeData({
      formValid: this.interestpolicyform.valid ,
      data: this.interestPolicyModel,
      stepperIndex: 1,
    });
  }
  navigateToBack(){
    this.router.navigate([]);
  } 
  //get all interest positing frequency 
   //  @author vinitha
  getAllinterestpostingfrequency() {
    this.commonComponent.startSpinner();
    this.interestpostingfrequency.getAllInterestPostingFrequency().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.intpostingfrequencylist = this.responseModel.data;
        this.intpostingfrequencylist = this.intpostingfrequencylist.filter((activity: any) => activity != null).map((act: { name: any; id: any; }) => {
          return { label: act.name, value: act.id };
        });
       
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 1000);
      } else {
        this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
    });
  }
}
