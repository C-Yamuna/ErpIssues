import { Component } from '@angular/core';
import { GeneralConfig } from '../add-sb-product-definition/general-config/shared/general-config.model';
import { InterestPolicy } from '../add-sb-product-definition/interest-policy/shared/interest-policy.model';
import { TransactionLimitConfig } from '../add-sb-product-definition/transaction-limit-config/shared/transaction-limit-config.model';
import { RequiredDocuments } from '../add-sb-product-definition/required-documents/shared/required-documents.model';
import { ServiceCharges } from '../add-sb-product-definition/service-charges/shared/service-charges.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { FormBuilder } from '@angular/forms';
import { GeneralConfigService } from '../add-sb-product-definition/general-config/shared/general-config.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { DatePipe } from '@angular/common';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { ActivatedRoute, Router } from '@angular/router';
import { savingsbanktransactionconstant } from '../../savingsbank-transaction-constant';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-view-sb-product-definition',
  templateUrl: './view-sb-product-definition.component.html',
  styleUrls: ['./view-sb-product-definition.component.css']
})
export class ViewSbProductDefinitionComponent {
  generalConfigModel :GeneralConfig = new GeneralConfig();
  interestPolicyModel : InterestPolicy =new InterestPolicy();
  transactionLimitConfigModel:TransactionLimitConfig = new TransactionLimitConfig();
  serviceChargesModel:ServiceCharges=new ServiceCharges();
  requiredDocumentsModel :RequiredDocuments =new RequiredDocuments();
  borrowingaccountmapping: any[] = [];
  borrowingdocument: any[] = [];
  statusList: any[]=[];
 
  responseModel!: Responsemodel;
  msgs: any[]=[];
  editbtn: boolean = true;
  isEdit: any;
  buttonDisabled?: any;
  orgnizationSetting: any;

  isShowSubmit: boolean =applicationConstants.FALSE;
  servicechargeslist: any[]=[];
  productId:any;
  requireddocumentlist: any[]=[];
  intpostingfrequencylist: any[]=[];
  constructor(private commonComponent: CommonComponent, private formBuilder: FormBuilder,
    private generalConfigService : GeneralConfigService, private translate: TranslateService,

    private activateRoute: ActivatedRoute, private encryptService: EncryptDecryptService,private datePipe: DatePipe,
    private router: Router, private commonFunctionsService: CommonFunctionsService) {

  }

  ngOnInit(): void {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.intpostingfrequencylist = this.commonComponent.rePaymentFrequency();
    this.commonFunctionsService.data.subscribe((res: any) => {
      if (res) {
        this.translate.use(res);
      } else {
        this.translate.use(this.commonFunctionsService.getStorageValue('language'));
      }
    this.activateRoute.queryParams.subscribe(params => {
      this.commonComponent.startSpinner();
      if (params['id'] != undefined && params['id'] != null) {
          this.productId = this.encryptService.decrypt(params['id']);
        if (params['editbtn'] != undefined && params['editbtn'] != null) {
          let isEditParam = this.encryptService.decrypt(params['editbtn']);
          if (isEditParam === "1") {
            this.editbtn = applicationConstants.TRUE;
          } else {
            this.editbtn = applicationConstants.FALSE;
          }
        }
        if (params['isGridPage'] != undefined && params['isGridPage'] != null) {
          let isGrid = this.encryptService.decrypt(params['isGridPage']);
          if (isGrid === "0") {
            this.isShowSubmit = applicationConstants.FALSE;
          } else {
            this.isShowSubmit = applicationConstants.TRUE;
          }
        }
        this.isEdit = applicationConstants.TRUE;
        this.generalConfigService.getGeneralConfigById(this.productId).subscribe(res => {
          this.responseModel = res;
          if(this.generalConfigModel.effectiveStartDate != undefined && this.generalConfigModel.effectiveStartDate != null)
            this.generalConfigModel.effectiveStartDate = this.commonFunctionsService.getUTCEpoch(new Date(this.generalConfigModel.effectiveStartDate));
          if (this.responseModel != null && this.responseModel != undefined) {
            this.generalConfigModel = this.responseModel.data[0];
            if(null != this.generalConfigModel.effectiveStartDate)
           this.generalConfigModel.effectiveStartDate=this.datePipe.transform(this.generalConfigModel.effectiveStartDate, this.orgnizationSetting.datePipe);
           

            if(this.generalConfigModel.interestPolicyConfigDto != null && this.generalConfigModel.interestPolicyConfigDto != undefined)
              this.interestPolicyModel = this.generalConfigModel.interestPolicyConfigDto;
            if(null != this.interestPolicyModel.effectiveStartDate)
              this.interestPolicyModel.effectiveStartDate=this.datePipe.transform(this.interestPolicyModel.effectiveStartDate, this.orgnizationSetting.datePipe);

            if(null != this.interestPolicyModel.interestPostingDate)
              this.interestPolicyModel.interestPostingDate=this.datePipe.transform(this.interestPolicyModel.interestPostingDate, this.orgnizationSetting.datePipe);

            if (this.generalConfigModel.transactionLimitConfigDto != null && this.generalConfigModel.transactionLimitConfigDto!= undefined) {
              this.transactionLimitConfigModel = this.generalConfigModel.transactionLimitConfigDto;
            }
            if(null != this.transactionLimitConfigModel.effectiveStartDate)
              this.transactionLimitConfigModel.effectiveStartDate=this.datePipe.transform(this.transactionLimitConfigModel.effectiveStartDate, this.orgnizationSetting.datePipe);
           
            
            if (this.generalConfigModel.accServiceConfigChargesList != null && this.generalConfigModel.accServiceConfigChargesList != undefined && this.generalConfigModel.accServiceConfigChargesList.length > 0) {
              this.servicechargeslist = this.generalConfigModel.accServiceConfigChargesList;
              this.servicechargeslist = this.servicechargeslist.filter((data:any) => data !=null &&data.effectiveStartDate !=null).map((object:any) => {
                object.effectiveStartDate = this.datePipe.transform(object.effectiveStartDate, this.orgnizationSetting.datePipe);
                return object;
              });
            }

            if (this.generalConfigModel.requiredDocumentsConfigList != null && this.generalConfigModel.requiredDocumentsConfigList != undefined && this.generalConfigModel.requiredDocumentsConfigList.length > 0) {
              this.requireddocumentlist = this.generalConfigModel.requiredDocumentsConfigList;
              this.requireddocumentlist = this.requireddocumentlist.filter((data:any) => data !=null &&data.effectiveStartDate !=null).map((object:any) => {
                object.effectiveStartDate = this.datePipe.transform(object.effectiveStartDate, this.orgnizationSetting.datePipe);
                return object;
              });
            }

          
           

          }
        });
      } else {
        this.isEdit = false;
      }
    })
    })
    }


  navigateToBack() {
      this.router.navigate([savingsbanktransactionconstant.SB_PRODUCT_DEFINITION]);
  }
  submit() {
    this.msgs = [];  
    this.msgs = [{ severity: "success", detail:  applicationConstants.SB_PRODUCT_DEFINITION }];
    setTimeout(() => {
      this.router.navigate([savingsbanktransactionconstant.SB_PRODUCT_DEFINITION]);
    }, 1500);
  }
  editproductdefinition(rowData: any, activeIndex: any) {
    switch (activeIndex) {
      case 0:
        this.router.navigate([savingsbanktransactionconstant.SB_GENERAL_CONFIGURATION], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 1:
        this.router.navigate([savingsbanktransactionconstant.SB_INTEREST_POLICY], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 2:
        this.router.navigate([savingsbanktransactionconstant.SB_TRANSACTION_LIMIT_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
        case 3:
        this.router.navigate([savingsbanktransactionconstant.SB_SERVICE_CHARGES], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
        case 4:
        this.router.navigate([savingsbanktransactionconstant.REQUIRED_DOCUMENTS], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
    }
  }
}
