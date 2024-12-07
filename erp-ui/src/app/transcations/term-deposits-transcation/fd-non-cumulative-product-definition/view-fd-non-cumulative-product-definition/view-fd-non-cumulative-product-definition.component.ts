import { Component } from '@angular/core';
import { termdeposittransactionconstant } from '../../term-deposit-transaction-constant';
import { FdNonCumulativeProductDefinition } from '../shared/fd-non-cumulative-product-definition.model';
import { FdNonCumulativeInterestPolicy } from '../add-fd-non-cumulative-product-definition/fd-non-cumulative-interest-policy/shared/fd-non-cumulative-interest-policy.model';
import { FdNonCumulativeRequiredDocuments } from '../add-fd-non-cumulative-product-definition/fd-non-cumulative-required-documents/shared/fd-non-cumulative-required-documents.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { FdNonCumulativeProductDefinitionService } from '../shared/fd-non-cumulative-product-definition.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';


@Component({
  selector: 'app-view-fd-non-cumulative-product-definition',
  templateUrl: './view-fd-non-cumulative-product-definition.component.html',
  styleUrls: ['./view-fd-non-cumulative-product-definition.component.css']
})
export class ViewFdNonCumulativeProductDefinitionComponent {
  fdNonCumulativeProductDefinitionModel :FdNonCumulativeProductDefinition = new FdNonCumulativeProductDefinition();
  fdNonCumulativeInterestPolicyModel :FdNonCumulativeInterestPolicy = new FdNonCumulativeInterestPolicy();
  fdNonCumulativeRequiredDocumentsModel : FdNonCumulativeRequiredDocuments = new FdNonCumulativeRequiredDocuments();
  interestPolicyList: any[] = [];
  requiredDocumentsList: any[] = [];
  statusList: any[]=[];
 
  responseModel!: Responsemodel;
  msgs: any[]=[];
  isEdit: any;
  buttonDisabled?: any;
  orgnizationSetting: any;
  memberLandDetails: any;
  fdNonCummulativeProductId:any;
  editbtn: Boolean = applicationConstants.TRUE;
  showSubmitButton: boolean = false;
  buttonDisbled: boolean = false;
  editbtns: Boolean = applicationConstants.TRUE;
  isShowSubmit: boolean =applicationConstants.FALSE;

  constructor(private commonComponent: CommonComponent, private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute, private encryptService: EncryptDecryptService,private datePipe: DatePipe,
    private router: Router, private commonFunctionsService: CommonFunctionsService,private translate: TranslateService,
    private fdNonCumulativeProductDefinitionService:FdNonCumulativeProductDefinitionService) {

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
      this.fdNonCummulativeProductId = this.encryptService.decrypt(params['id']);
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
    this.fdNonCumulativeProductDefinitionService.getFdNonCumulativeProductDefinitionOverviewDetailsById(this.fdNonCummulativeProductId).subscribe(res => {
      this.responseModel = res;
      if (this.responseModel != null && this.responseModel != undefined) {
        this.fdNonCumulativeProductDefinitionModel = this.responseModel.data[0];
        if(null != this.fdNonCumulativeProductDefinitionModel.effectiveStartDate && undefined != this.fdNonCumulativeProductDefinitionModel.effectiveStartDate)
          this.fdNonCumulativeProductDefinitionModel.effectiveStartDate=this.datePipe.transform(this.fdNonCumulativeProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);

        if (this.fdNonCumulativeProductDefinitionModel.fdNonCummulativeInterestPolicyConfigList != null && this.fdNonCumulativeProductDefinitionModel.fdNonCummulativeInterestPolicyConfigList != undefined && this.fdNonCumulativeProductDefinitionModel.fdNonCummulativeInterestPolicyConfigList.length > 0) {
          this.interestPolicyList = this.fdNonCumulativeProductDefinitionModel.fdNonCummulativeInterestPolicyConfigList;
        
        }
        if (this.fdNonCumulativeProductDefinitionModel.fdNonCummulativeRequiredDocumentsConfigList != null && this.fdNonCumulativeProductDefinitionModel.fdNonCummulativeRequiredDocumentsConfigList != undefined && this.fdNonCumulativeProductDefinitionModel.fdNonCummulativeRequiredDocumentsConfigList.length > 0) {
          this.requiredDocumentsList = this.fdNonCumulativeProductDefinitionModel.fdNonCummulativeRequiredDocumentsConfigList;
          
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
    this.router.navigate([termdeposittransactionconstant.FD_NON_CUMULATIVE_PRODUCT_DEFINITION]);
}
submit(){
  this.buttonDisbled = true;
  this.msgs = [];  
  this.msgs = [{ severity: "success", detail:  applicationConstants.FD_NON_CUMULATIVE_PRODUCT_DEFINITION }];
setTimeout(() => {
  this.router.navigate([termdeposittransactionconstant.FD_NON_CUMULATIVE_PRODUCT_DEFINITION]);
}, 1500);

}
editFdNonCummlativeproductDefinationdetails(rowData: any, activeIndex: any) {
  switch (activeIndex) {
    case 0:
      this.router.navigate([termdeposittransactionconstant.FD_NON_CUMULATIVE_GENERAL_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.fdNonCummulativeProductId) } });
      break;
    case 1:
      this.router.navigate([termdeposittransactionconstant.FD_NON_CUMULATIVE_INTEREST_POLICY], { queryParams: { id: this.encryptService.encrypt(rowData.fdNonCummulativeProductId) } });
      break;
    case 2:
      this.router.navigate([termdeposittransactionconstant.FD_NON_CUMULATIVE_REQUIRED_DOCUMENTS], { queryParams: { id: this.encryptService.encrypt(rowData.fdNonCummulativeProductId) } });
      break;
  }
}
}
