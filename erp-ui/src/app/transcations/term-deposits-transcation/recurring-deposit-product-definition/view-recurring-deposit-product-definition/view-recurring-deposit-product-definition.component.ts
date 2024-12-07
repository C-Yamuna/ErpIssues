import { Component } from '@angular/core';
import { termdeposittransactionconstant } from '../../term-deposit-transaction-constant';
import { RecurringDepositProductDefinition } from '../shared/recurring-deposit-product-definition.model';
import { RecurringDepositPenalityConfig } from '../add-recurring-deposit-product-definition/recurring-deposit-penality-config/shared/recurring-deposit-penality-config.model';
import { RecurringDepositInterestPolicy } from '../add-recurring-deposit-product-definition/recurring-deposit-interest-policy/shared/recurring-deposit-interest-policy.model';
import { RecurringDepositRequiredDocuments } from '../add-recurring-deposit-product-definition/recurring-deposit-required-documents/shared/recurring-deposit-required-documents.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { RecurringDepositProductDefinitionService } from '../shared/recurring-deposit-product-definition.service';

@Component({
  selector: 'app-view-recurring-deposit-product-definition',
  templateUrl: './view-recurring-deposit-product-definition.component.html',
  styleUrls: ['./view-recurring-deposit-product-definition.component.css']
})
export class ViewRecurringDepositProductDefinitionComponent {
  recurringDepositProductDefinitionModel :RecurringDepositProductDefinition = new RecurringDepositProductDefinition();
  recurringDepositInterestPolicyModel :RecurringDepositInterestPolicy = new RecurringDepositInterestPolicy();
  recurringDepositPenalityConfigModel :RecurringDepositPenalityConfig = new RecurringDepositPenalityConfig();
  recurringDepositRequiredDocumentsModel : RecurringDepositRequiredDocuments = new RecurringDepositRequiredDocuments();
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
  rdProductId:any;
  editbtn: Boolean = applicationConstants.TRUE;
  isShowSubmit: boolean =applicationConstants.FALSE;
  constructor(private commonComponent: CommonComponent, private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute, private encryptService: EncryptDecryptService,private datePipe: DatePipe,
    private router: Router, private commonFunctionsService: CommonFunctionsService,private translate: TranslateService,
    private recurringDepositProductDefinitionService : RecurringDepositProductDefinitionService,) {

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
        this.rdProductId = this.encryptService.decrypt(params['id']);
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
      this.recurringDepositProductDefinitionService.getRecurringDepositProductDefinitionOverviewDetailsById(this.rdProductId).subscribe(res => {
        this.responseModel = res;
        if (this.responseModel != null && this.responseModel != undefined) {
          this.recurringDepositProductDefinitionModel = this.responseModel.data[0];
          if(null != this.recurringDepositProductDefinitionModel.effectiveStartDate && undefined != this.recurringDepositProductDefinitionModel.effectiveStartDate)
            this.recurringDepositProductDefinitionModel.effectiveStartDate=this.datePipe.transform(this.recurringDepositProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
  
          if (this.recurringDepositProductDefinitionModel.intestPolicyConfigList != null && this.recurringDepositProductDefinitionModel.intestPolicyConfigList != undefined && this.recurringDepositProductDefinitionModel.intestPolicyConfigList.length > 0) {
            this.interestPolicyList = this.recurringDepositProductDefinitionModel.intestPolicyConfigList;
          
          }
          if (this.recurringDepositProductDefinitionModel.penaltyConfigList != null && this.recurringDepositProductDefinitionModel.penaltyConfigList != undefined && this.recurringDepositProductDefinitionModel.penaltyConfigList.length > 0) {
            this.penalityConfigList = this.recurringDepositProductDefinitionModel.penaltyConfigList;
            
          }
          if (this.recurringDepositProductDefinitionModel.requiredDocumentsConfigList != null && this.recurringDepositProductDefinitionModel.requiredDocumentsConfigList != undefined && this.recurringDepositProductDefinitionModel.requiredDocumentsConfigList.length > 0) {
            this.requiredDocumentsList = this.recurringDepositProductDefinitionModel.requiredDocumentsConfigList;
            
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
    this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_PRODUCT_DEFINITION]); 
}
submit() {
  this.msgs = [];  
  this.msgs = [{ severity: "success", detail:  applicationConstants.RD_PRODUCT_DEFINITION }];
  setTimeout(() => {
    this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_PRODUCT_DEFINITION]); 
  }, 1500);
}
editRecurringDepositproductDefinationdetails(rowData: any, activeIndex: any) {
  switch (activeIndex) {
    case 0:
      this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_GENERAL_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.rdProductId) } });
      break;
    case 1:
      this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_INTEREST_POLICY], { queryParams: { id: this.encryptService.encrypt(rowData.rdProductId) } });
      break;
    case 2:
      this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_PENALITY_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.rdProductId) } });
      break;
      case 3:
        this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_REQUIRED_DOCUMENTS_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.rdProductId) } });
        break;
  }
}
}
