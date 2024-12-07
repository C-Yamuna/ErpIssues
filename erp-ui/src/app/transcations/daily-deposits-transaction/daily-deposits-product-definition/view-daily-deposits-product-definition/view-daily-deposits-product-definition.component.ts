import { Component } from '@angular/core';
import { DailyDepositsProductDefinition } from '../shared/daily-deposits-product-definition.model';
import { InterestPolicy } from '../add-daily-deposits-product-definition/interest-policy/shared/interest-policy.model';
import { PenalityConfig } from '../add-daily-deposits-product-definition/penality-config/shared/penality-config.model';
import { RequiredDocuments } from '../add-daily-deposits-product-definition/required-documents/shared/required-documents.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { FormBuilder } from '@angular/forms';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { TranslateService } from '@ngx-translate/core';
import { DailyDepositsProductDefinitionService } from '../shared/daily-deposits-product-definition.service';
import { DailyDepositTransactionConstants } from '../../daily-deposits-transaction-constants';

@Component({
  selector: 'app-view-daily-deposits-product-definition',
  templateUrl: './view-daily-deposits-product-definition.component.html',
  styleUrls: ['./view-daily-deposits-product-definition.component.css']
})
export class ViewDailyDepositsProductDefinitionComponent {
  dailyDepositsProductDefinitionModel:DailyDepositsProductDefinition = new DailyDepositsProductDefinition();
  interestPolicyModel :InterestPolicy = new InterestPolicy();
  penalityConfigModel :PenalityConfig = new PenalityConfig();
  requiredDocumentsModel : RequiredDocuments = new RequiredDocuments();
  interestPolicyList: any[] = [];
  penalityConfigList: any[] = [];
  requiredDocumentsList: any[] = [];
  statusList: any[]=[];
  responseModel!: Responsemodel;
  msgs: any[]=[];
  isEdit: any;
  buttonDisabled?: any;
  orgnizationSetting: any;
  memberLandDetails: any;
  productId:any;
  editbtn: Boolean = applicationConstants.TRUE;
  isShowSubmit: boolean =applicationConstants.FALSE;
  constructor(private commonComponent: CommonComponent, 
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute, 
    private encryptService: EncryptDecryptService,
    private datePipe: DatePipe,
    private router: Router, 
    private commonFunctionsService: CommonFunctionsService,
    private translate: TranslateService,
    private dailyDepositsProductDefinitionService: DailyDepositsProductDefinitionService) {

}
ngOnInit(): void {
this.orgnizationSetting = this.commonComponent.orgnizationSettings()
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
      if (isEditParam == "1") {
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
    this.dailyDepositsProductDefinitionService.getProductOverviewById(this.productId).subscribe(res => {
      this.responseModel = res;
      if (this.responseModel != null && this.responseModel != undefined) {
        this.dailyDepositsProductDefinitionModel = this.responseModel.data[0];
        if(null != this.dailyDepositsProductDefinitionModel.effectiveStartDate && undefined != this.dailyDepositsProductDefinitionModel.effectiveStartDate)
          this.dailyDepositsProductDefinitionModel.effectiveStartDate=this.datePipe.transform(this.dailyDepositsProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);

        if (this.dailyDepositsProductDefinitionModel.intestPolicyConfigList != null && this.dailyDepositsProductDefinitionModel.intestPolicyConfigList != undefined && this.dailyDepositsProductDefinitionModel.intestPolicyConfigList.length > 0) {
          this.interestPolicyList = this.dailyDepositsProductDefinitionModel.intestPolicyConfigList;
          // this.interestPolicyList = this.interestPolicyList.filter((data:any) => data !=null &&data.effectiveStartDate !=null).map((object:any) => {
          //   object.effectiveStartDate = this.datePipe.transform(object.effectiveStartDate, this.orgnizationSetting.datePipe);
          //   return object;
          // });
        }
        if (this.dailyDepositsProductDefinitionModel.penaltyConfigList != null && this.dailyDepositsProductDefinitionModel.penaltyConfigList != undefined && this.dailyDepositsProductDefinitionModel.penaltyConfigList.length > 0) {
          this.penalityConfigList = this.dailyDepositsProductDefinitionModel.penaltyConfigList;
          // this.penalityConfigList = this.penalityConfigList.filter((data:any) => data !=null &&data.effectiveStartDate !=null).map((object:any) => {
          //   object.effectiveStartDate = this.datePipe.transform(object.effectiveStartDate, this.orgnizationSetting.datePipe);
          //   return object;
          // });
        }
        if (this.dailyDepositsProductDefinitionModel.requiredDocumentsConfigList != null && this.dailyDepositsProductDefinitionModel.requiredDocumentsConfigList != undefined && this.dailyDepositsProductDefinitionModel.requiredDocumentsConfigList.length > 0) {
          this.requiredDocumentsList = this.dailyDepositsProductDefinitionModel.requiredDocumentsConfigList;
          // this.requiredDocumentsList = this.requiredDocumentsList.filter((data:any) => data !=null &&data.effectiveStartDate !=null).map((object:any) => {
          //   object.effectiveStartDate = this.datePipe.transform(object.effectiveStartDate, this.orgnizationSetting.datePipe);
          //   return object;
          // });
        }
      }
    });
  } else {
    this.isEdit = applicationConstants.FALSE;
  }
})
})
}
navigateToBack() {
    this.router.navigate([DailyDepositTransactionConstants.DAILY_DEPOSIT_PRODUCT_DEFINITION]);
}
submit() {
  this.msgs = [];  
  this.msgs = [{ severity: "success", detail:  applicationConstants.DAILY_DEPOSIT_PRODUCT_DEFINITION }];
  setTimeout(() => {
    this.router.navigate([DailyDepositTransactionConstants.DAILY_DEPOSIT_PRODUCT_DEFINITION]);
  }, 1500);
}
editDailyDepositProductDefinationDetails(rowData: any, activeIndex: any) {
  switch (activeIndex) {
    case 0:
      this.router.navigate([DailyDepositTransactionConstants.DAILY_DEPOSIT_GENERAL_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.productId) } });
      break;
    case 1:
      this.router.navigate([DailyDepositTransactionConstants.DAILY_DEPOSIT_INTEREST_POLICY], { queryParams: { id: this.encryptService.encrypt(rowData.productId) } });
      break;
    case 2:
      this.router.navigate([DailyDepositTransactionConstants.DAILY_DEPOSIT_PENALITY_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.productId) } });
      break;
      case 3:
        this.router.navigate([DailyDepositTransactionConstants.DAILY_DEPOSIT_REQUIRED_DOCUMENTS], { queryParams: { id: this.encryptService.encrypt(rowData.productId) } });
        break;
  }
}
}
