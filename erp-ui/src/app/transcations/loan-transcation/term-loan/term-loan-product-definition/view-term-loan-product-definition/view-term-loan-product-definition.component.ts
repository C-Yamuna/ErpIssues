import { Component } from '@angular/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { Loantransactionconstant } from '../../../loan-transaction-constant';
import { TermLoanProductDefinition } from '../shared/term-loan-product-definition.model';
import { TermLoanInterestPolicy } from '../term-loan-product-definition-stepper/term-loan-interest-policy/shared/term-loan-interest-policy.model';
import { TermLoanLinkedShareCapital } from '../term-loan-product-definition-stepper/term-loan-linked-share-capital/shared/term-loan-linked-share-capital.model';
import { TermLoanPurpose } from '../term-loan-product-definition-stepper/term-loan-purpose/shared/term-loan-purpose.model';
import { TermLoanRequiredDocuments } from '../term-loan-product-definition-stepper/term-loan-required-documents/shared/term-loan-required-documents.model';
import { TermLoanCharges } from '../term-loan-product-definition-stepper/term-loan-charges/shared/term-loan-charges.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TermLoanProductDefinitionService } from '../shared/term-loan-product-definition.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-term-loan-product-definition',
  templateUrl: './view-term-loan-product-definition.component.html',
  styleUrls: ['./view-term-loan-product-definition.component.css']
})
export class ViewTermLoanProductDefinitionComponent {
  termLoanProductDefinitionModel :TermLoanProductDefinition = new TermLoanProductDefinition();
  termLoanInterestPolicyModel :TermLoanInterestPolicy = new TermLoanInterestPolicy();
  termLoanLinkedShareCapitalModel :TermLoanLinkedShareCapital = new TermLoanLinkedShareCapital();
  termLoanChargesModel : TermLoanCharges = new TermLoanCharges();
  termLoanPurposeModel : TermLoanPurpose = new TermLoanPurpose();
  termLoanRequiredDocumentsModel : TermLoanRequiredDocuments = new TermLoanRequiredDocuments();
  interestPolicyList: any[] = [];
  requiredDocumentsList: any[] = [];
  chargesList: any[] = [];
  purposeList: any[] = [];
  linkedShareCapitalList: any[] = [];
  statusList: any[] = [];
  interestPostingFrequencyList: any[] = [];
  collectionOrderList: any[] = [];
  responseModel!: Responsemodel;
  msgs: any[] = [];
  collateralList: any[] = [];
  isEdit: any;
  buttonDisabled?: any;
  orgnizationSetting: any;
  memberLandDetails: any;
  termProductId: any;
  editbtn: Boolean = applicationConstants.TRUE;
  isShowSubmit: boolean =applicationConstants.FALSE;
  constructor(private commonComponent: CommonComponent, private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute, private encryptService: EncryptDecryptService, private datePipe: DatePipe,
    private router: Router, private commonFunctionsService: CommonFunctionsService, private translate: TranslateService,
    private termLoanProductDefinitionService : TermLoanProductDefinitionService,) {

  }
  ngOnInit(): void {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.interestPostingFrequencyList = this.commonComponent.rePaymentFrequency();
    this.commonFunctionsService.data.subscribe((res: any) => {
      if (res) {
        this.translate.use(res);
      } else {
        this.translate.use(this.commonFunctionsService.getStorageValue('language'));
      }
      this.activateRoute.queryParams.subscribe(params => {
        this.commonComponent.startSpinner();
        if (params['id'] != undefined && params['id'] != null) {
          this.termProductId = this.encryptService.decrypt(params['id']);
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
          this.termLoanProductDefinitionService.getPreviewDetailsByProductId(this.termProductId).subscribe(res => {
            this.responseModel = res;
            if (this.responseModel != null && this.responseModel != undefined) {
              this.termLoanProductDefinitionModel = this.responseModel.data[0];
              if (null != this.termLoanProductDefinitionModel.effectiveStartDate && undefined != this.termLoanProductDefinitionModel.effectiveStartDate)
                this.termLoanProductDefinitionModel.effectiveStartDate = this.datePipe.transform(this.termLoanProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
            
              if (this.termLoanProductDefinitionModel.termProdCollateralsConfigList) {
                this.collateralList = this.termLoanProductDefinitionModel.termProdCollateralsConfigList
                  .filter((item: any) => item != null && item.status === applicationConstants.ACTIVE)
                  .map((item: { collateralTypeName: any, collateralType: any }) => ({
                    label: item.collateralTypeName,
                    value: item.collateralType
                  }));
              }
              
            
            
              if (this.termLoanProductDefinitionModel.termInterestPolicyConfigDTOList != null && this.termLoanProductDefinitionModel.termInterestPolicyConfigDTOList != undefined && this.termLoanProductDefinitionModel.termInterestPolicyConfigDTOList.length > 0) {
                this.interestPolicyList = this.termLoanProductDefinitionModel.termInterestPolicyConfigDTOList;
                this.interestPolicyList = this.interestPolicyList.filter((data: any) => data != null && data.effectiveStartDate != null).map((object: any) => {
                  object.effectiveStartDate = this.datePipe.transform(object.effectiveStartDate, this.orgnizationSetting.datePipe);
                  return object;
                });
              }
              if (this.termLoanProductDefinitionModel.termApportionConfigDTOList != null && this.termLoanProductDefinitionModel.termApportionConfigDTOList != undefined && this.termLoanProductDefinitionModel.termApportionConfigDTOList.length > 0) {
                this.collectionOrderList = this.termLoanProductDefinitionModel.termApportionConfigDTOList;
                this.collectionOrderList = this.collectionOrderList.filter((data: any) => data != null && data.effectiveStartDate != null).map((object: any) => {
                  object.effectiveStartDate = this.datePipe.transform(object.effectiveStartDate, this.orgnizationSetting.datePipe);
                  return object;
                });
              }
              if (this.termLoanProductDefinitionModel.termLoanLinkedSharecapitalConfigList != null && this.termLoanProductDefinitionModel.termLoanLinkedSharecapitalConfigList != undefined && this.termLoanProductDefinitionModel.termLoanLinkedSharecapitalConfigList.length > 0) {
                this.linkedShareCapitalList = this.termLoanProductDefinitionModel.termLoanLinkedSharecapitalConfigList;
                this.linkedShareCapitalList = this.linkedShareCapitalList.filter((data: any) => data != null && data.effectiveStartDate != null).map((object: any) => {
                  object.effectiveStartDate = this.datePipe.transform(object.effectiveStartDate, this.orgnizationSetting.datePipe);
                  return object;
                });
              }

              if (this.termLoanProductDefinitionModel.termProductChargesConfigDTOList != null && this.termLoanProductDefinitionModel.termProductChargesConfigDTOList != undefined && this.termLoanProductDefinitionModel.termProductChargesConfigDTOList.length > 0) {
                this.chargesList = this.termLoanProductDefinitionModel.termProductChargesConfigDTOList;
                this.chargesList = this.chargesList.filter((data: any) => data != null && data.effectiveStartDate != null).map((object: any) => {
                  object.effectiveStartDate = this.datePipe.transform(object.effectiveStartDate, this.orgnizationSetting.datePipe);
                  return object;
                });
              }
              if (this.termLoanProductDefinitionModel.termProdPurPoseConfgList != null && this.termLoanProductDefinitionModel.termProdPurPoseConfgList != undefined && this.termLoanProductDefinitionModel.termProdPurPoseConfgList.length > 0) {
                this.purposeList = this.termLoanProductDefinitionModel.termProdPurPoseConfgList;
                this.purposeList = this.purposeList.filter((data: any) => data != null && data.effectiveStartDate != null).map((object: any) => {
                  object.effectiveStartDate = this.datePipe.transform(object.effectiveStartDate, this.orgnizationSetting.datePipe);
                  return object;
                });
              }

              if (this.termLoanProductDefinitionModel.termRequiredDocumentsConfigDTOList != null && this.termLoanProductDefinitionModel.termRequiredDocumentsConfigDTOList != undefined && this.termLoanProductDefinitionModel.termRequiredDocumentsConfigDTOList.length > 0) {
                this.requiredDocumentsList = this.termLoanProductDefinitionModel.termRequiredDocumentsConfigDTOList;
                this.requiredDocumentsList = this.requiredDocumentsList.filter((data: any) => data != null && data.effectiveStartDate != null).map((object: any) => {
                  object.effectiveStartDate = this.datePipe.transform(object.effectiveStartDate, this.orgnizationSetting.datePipe);
                  return object;
                });
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
      this.router.navigate([Loantransactionconstant.TERM_LOAN_PRODUCT_DEFINITION]);

  }
  submit() {
    this.msgs = [];  
    this.msgs = [{ severity: "success", detail:  applicationConstants.TERM_LOAN_PRODUCT_DEFINITION }];
    setTimeout(() => {
      this.router.navigate([Loantransactionconstant.TERM_LOAN_PRODUCT_DEFINITION]);
    }, 1500);
  }
  editTermLoansproductDefinationdetails(rowData: any, activeIndex: any) {
    switch (activeIndex) {
      case 0:
        this.router.navigate([Loantransactionconstant.TERM_LOAN_PRODUCT_CONFIGURATION], { queryParams: { id: this.encryptService.encrypt(rowData.termProductId) } });
        break;
      case 1:
        this.router.navigate([Loantransactionconstant.TERM_LOAN_INTEREST_POLICY_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.termProductId) } });
        break;
      case 2:
        this.router.navigate([Loantransactionconstant.TERM_LOAN_LOAN_LINKED_SHARE_CAPITAL], { queryParams: { id: this.encryptService.encrypt(rowData.termProductId) } });
        break;
      case 3:
        this.router.navigate([Loantransactionconstant.TERM_LOAN_PRODUCT_CHARGES_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.termProductId) } });
        break;
      case 4:
        this.router.navigate([Loantransactionconstant.TERM_LOAN_PROD_PURPOSE_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.termProductId) } });
        break;
      case 5:
        this.router.navigate([Loantransactionconstant.TERM_LOAN_REQUIRED_DOCUMENT_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.termProductId) } });
        break;
    }
  }
}
