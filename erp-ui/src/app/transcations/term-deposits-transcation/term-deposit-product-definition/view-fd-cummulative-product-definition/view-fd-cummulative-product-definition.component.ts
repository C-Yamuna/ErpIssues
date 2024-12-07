import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { GeneralConfig } from '../add-td-product-definition/general-config/shared/general-config.model';
import { InterestPolicy } from '../add-td-product-definition/interest-policy/shared/interest-policy.model';
import { RequiredDocuments } from '../add-td-product-definition/required-documents/shared/required-documents.model';
import { termdeposittransactionconstant } from '../../term-deposit-transaction-constant';
import { TermDepositProductDefinitionService } from '../shared/term-deposit-product-definition.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-view-fd-cummulative-product-definition',
  templateUrl: './view-fd-cummulative-product-definition.component.html',
  styleUrls: ['./view-fd-cummulative-product-definition.component.css']
})
export class ViewFdCummulativeProductDefinitionComponent {
  generalConfigModel :GeneralConfig = new GeneralConfig();
  interestPolicyModel :InterestPolicy = new InterestPolicy();
  requiredDocumentsModel :RequiredDocuments = new RequiredDocuments();
  interestPolicyList: any[] = [];
  requiredDocumentsList: any[] = [];
  statusList: any[]=[];
 
  responseModel!: Responsemodel;
  msgs: any[]=[];

  isEdit: any;
  buttonDisabled?: any;
  orgnizationSetting: any;
  countryList: any[]=[];
  memberLandDetails: any;
  fdCummulativeId:any;
  editbtn: Boolean = true;
  isShowSubmit: boolean =applicationConstants.FALSE;
  constructor(private commonComponent: CommonComponent, private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute, private encryptService: EncryptDecryptService,private datePipe: DatePipe,
    private router: Router, private commonFunctionsService: CommonFunctionsService,private translate: TranslateService,
    private termDepositProductDefinitionService:TermDepositProductDefinitionService) {

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
        this.fdCummulativeId = this.encryptService.decrypt(params['id']);
      if (params['editbtn'] != undefined && params['editbtn'] != null) {
        let isEditParam = this.encryptService.decrypt(params['editbtn']);
        // this.editbtn = (isEditParam === "1") ? applicationConstants.TRUE : applicationConstants.FALSE;
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
      this.termDepositProductDefinitionService.getFdCumulativeProductDefinitionOverviewDetailsById(this.fdCummulativeId).subscribe(res => {
        this.responseModel = res;
        if (this.responseModel != null && this.responseModel != undefined) {
          this.generalConfigModel = this.responseModel.data[0];
          if(null != this.generalConfigModel.effectiveStartDate)
            this.generalConfigModel.effectiveStartDate=this.datePipe.transform(this.generalConfigModel.effectiveStartDate, this.orgnizationSetting.datePipe);
          if(null != this.generalConfigModel.effectiveEndDate)
            this.generalConfigModel.effectiveEndDate=this.datePipe.transform(this.generalConfigModel.effectiveEndDate, this.orgnizationSetting.datePipe);
  
          if (this.generalConfigModel.intestPolicyConfigList != null && this.generalConfigModel.intestPolicyConfigList.length > 0) {
            this.interestPolicyList = this.generalConfigModel.intestPolicyConfigList;
            
          }
          if (this.generalConfigModel.requiredDocumentsConfigList != null && this.generalConfigModel.requiredDocumentsConfigList.length > 0) {
            this.requiredDocumentsList = this.generalConfigModel.requiredDocumentsConfigList;
            
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
    this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_PRODUCT_DEFINITION]); 
}
submit() {
  this.msgs = [];  
  this.msgs = [{ severity: "success", detail:  applicationConstants.FD_CUMULATIVE_PRODUCT_DEFINITION }];
  setTimeout(() => {
    this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_PRODUCT_DEFINITION]); 
  }, 1500);
}
editFdCummlativeproductDefinationdetails(rowData: any, activeIndex: any) {
  switch (activeIndex) {
    case 0:
      this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_GENERAL_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.fdCummulativeProductId) } });
      break;
    case 1:
      this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_INTEREST_POLICY], { queryParams: { id: this.encryptService.encrypt(rowData.fdCummulativeProductId) } });
      break;
    case 2:
      this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_REQUIRED_DOCUMENTS], { queryParams: { id: this.encryptService.encrypt(rowData.fdCummulativeProductId) } });
      break;
  }
}
}
