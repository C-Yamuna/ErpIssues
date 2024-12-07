import { Component } from '@angular/core';
import { CompoundInterestProductDefinition } from '../shared/compound-interest-product-definition.model';
import { CiCharges } from '../compound-interest-product-definition-stepper/ci-charges/shared/ci-charges.model';
import { CiRequiredDocuments } from '../compound-interest-product-definition-stepper/ci-required-documents/shared/ci-required-documents.model';
import { CiPurpose } from '../compound-interest-product-definition-stepper/ci-purpose/shared/ci-purpose.model';
import { CiLinkedShareCapital } from '../compound-interest-product-definition-stepper/ci-linked-share-capital/shared/ci-linked-share-capital.model';
import { CiInterestPolicy } from '../compound-interest-product-definition-stepper/ci-interest-policy/shared/ci-interest-policy.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CompoundInterestProductDefinitionService } from '../shared/compound-interest-product-definition.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonComponent } from 'src/app/shared/common.component';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { FormBuilder } from '@angular/forms';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Loantransactionconstant } from '../../../loan-transaction-constant';

@Component({
  selector: 'app-view-compound-interest-product-definition',
  templateUrl: './view-compound-interest-product-definition.component.html',
  styleUrls: ['./view-compound-interest-product-definition.component.css']
})
export class ViewCompoundInterestProductDefinitionComponent {
  compoundInterestProductDefinitionModel :CompoundInterestProductDefinition = new CompoundInterestProductDefinition();
  ciInterestPolicyModel :CiInterestPolicy = new CiInterestPolicy();
  ciLinkedShareCapitalModel :CiLinkedShareCapital = new CiLinkedShareCapital();
  ciChargesModel : CiCharges = new CiCharges();
  ciPurposeModel : CiPurpose = new CiPurpose();
  ciRequiredDocumentsModel : CiRequiredDocuments = new CiRequiredDocuments();
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
  ciProductId: any;
  editbtn: Boolean = applicationConstants.TRUE;
  isShowSubmit: boolean =applicationConstants.FALSE;
  constructor(private commonComponent: CommonComponent, private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute, private encryptService: EncryptDecryptService, private datePipe: DatePipe,
    private router: Router, private commonFunctionsService: CommonFunctionsService, private translate: TranslateService,
    private compoundInterestProductDefinitionService : CompoundInterestProductDefinitionService,) {

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
          this.ciProductId = this.encryptService.decrypt(params['id']);
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
          this.compoundInterestProductDefinitionService.getPreviewDetailsByProductId(this.ciProductId).subscribe(res => {
            this.responseModel = res;
            if (this.responseModel != null && this.responseModel != undefined) {
              this.compoundInterestProductDefinitionModel = this.responseModel.data[0];
              if (null != this.compoundInterestProductDefinitionModel.effectiveStartDate && undefined != this.compoundInterestProductDefinitionModel.effectiveStartDate)
                this.compoundInterestProductDefinitionModel.effectiveStartDate = this.datePipe.transform(this.compoundInterestProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
            
              if (this.compoundInterestProductDefinitionModel.ciProdCollateralsConfigDTOList) {
                this.collateralList = this.compoundInterestProductDefinitionModel.ciProdCollateralsConfigDTOList
                  .filter((item: any) => item != null  && item.status === applicationConstants.ACTIVE) 
                  .map((item: { collateralTypeName: string, collateralType: any }) => ({
                    label: item.collateralTypeName,
                    value: item.collateralType
                  }));
              }
            
            
              if (this.compoundInterestProductDefinitionModel.ciInterestPolicyConfigDTOList != null && this.compoundInterestProductDefinitionModel.ciInterestPolicyConfigDTOList != undefined && this.compoundInterestProductDefinitionModel.ciInterestPolicyConfigDTOList.length > 0) {
                this.interestPolicyList = this.compoundInterestProductDefinitionModel.ciInterestPolicyConfigDTOList;
                this.interestPolicyList = this.interestPolicyList.filter((data: any) => data != null && data.effectiveStartDate != null).map((object: any) => {
                  object.effectiveStartDate = this.datePipe.transform(object.effectiveStartDate, this.orgnizationSetting.datePipe);
                  return object;
                });
              }
              if (this.compoundInterestProductDefinitionModel.ciApportionConfigDTOList != null && this.compoundInterestProductDefinitionModel.ciApportionConfigDTOList != undefined && this.compoundInterestProductDefinitionModel.ciApportionConfigDTOList.length > 0) {
                this.collectionOrderList = this.compoundInterestProductDefinitionModel.ciApportionConfigDTOList;
                this.collectionOrderList = this.collectionOrderList.filter((data: any) => data != null && data.effectiveStartDate != null).map((object: any) => {
                  object.effectiveStartDate = this.datePipe.transform(object.effectiveStartDate, this.orgnizationSetting.datePipe);
                  return object;
                });
              }
              if (this.compoundInterestProductDefinitionModel.ciLoanLinkedShareCapitalConfigDTOList != null && this.compoundInterestProductDefinitionModel.ciLoanLinkedShareCapitalConfigDTOList != undefined && this.compoundInterestProductDefinitionModel.ciLoanLinkedShareCapitalConfigDTOList.length > 0) {
                this.linkedShareCapitalList = this.compoundInterestProductDefinitionModel.ciLoanLinkedShareCapitalConfigDTOList;
                this.linkedShareCapitalList = this.linkedShareCapitalList.filter((data: any) => data != null && data.effectiveStartDate != null).map((object: any) => {
                  object.effectiveStartDate = this.datePipe.transform(object.effectiveStartDate, this.orgnizationSetting.datePipe);
                  return object;
                });
              }

              if (this.compoundInterestProductDefinitionModel.ciProductChargesConfigDTOList != null && this.compoundInterestProductDefinitionModel.ciProductChargesConfigDTOList != undefined && this.compoundInterestProductDefinitionModel.ciProductChargesConfigDTOList.length > 0) {
                this.chargesList = this.compoundInterestProductDefinitionModel.ciProductChargesConfigDTOList;
                this.chargesList = this.chargesList.filter((data: any) => data != null && data.effectiveStartDate != null).map((object: any) => {
                  object.effectiveStartDate = this.datePipe.transform(object.effectiveStartDate, this.orgnizationSetting.datePipe);
                  return object;
                });
              }
              if (this.compoundInterestProductDefinitionModel.ciProdPurposeConfigDTOList != null && this.compoundInterestProductDefinitionModel.ciProdPurposeConfigDTOList != undefined && this.compoundInterestProductDefinitionModel.ciProdPurposeConfigDTOList.length > 0) {
                this.purposeList = this.compoundInterestProductDefinitionModel.ciProdPurposeConfigDTOList;
                this.purposeList = this.purposeList.filter((data: any) => data != null && data.effectiveStartDate != null).map((object: any) => {
                  object.effectiveStartDate = this.datePipe.transform(object.effectiveStartDate, this.orgnizationSetting.datePipe);
                  return object;
                });
              }

              if (this.compoundInterestProductDefinitionModel.ciRequiredDocumentsConfigDTOList != null && this.compoundInterestProductDefinitionModel.ciRequiredDocumentsConfigDTOList != undefined && this.compoundInterestProductDefinitionModel.ciRequiredDocumentsConfigDTOList.length > 0) {
                this.requiredDocumentsList = this.compoundInterestProductDefinitionModel.ciRequiredDocumentsConfigDTOList;
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
      this.router.navigate([Loantransactionconstant.COMPOUND_INTEREST_PRODUCT_DEFINITION]);
  }
  submit() {
    this.msgs = [];  
    this.msgs = [{ severity: "success", detail:  applicationConstants.CI_LOAN__PRODUCT_DEFINITION }];
    setTimeout(() => {
      this.router.navigate([Loantransactionconstant.COMPOUND_INTEREST_PRODUCT_DEFINITION]);
    }, 1500);
  }
  editCiLoansproductDefinationdetails(rowData: any, activeIndex: any) {
    switch (activeIndex) {
      case 0:
        this.router.navigate([Loantransactionconstant.COMPOUND_INTEREST_PRODUCT_CONFIGURATION], { queryParams: { id: this.encryptService.encrypt(rowData.ciProductId) } });
        break;
      case 1:
        this.router.navigate([Loantransactionconstant.COMPOUND_INTEREST_INTEREST_POLICY_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.ciProductId) } });
        break;
      case 2:
        this.router.navigate([Loantransactionconstant.COMPOUND_INTEREST_LOAN_LINKED_SHARE_CAPITAL], { queryParams: { id: this.encryptService.encrypt(rowData.ciProductId) } });
        break;
      case 3:
        this.router.navigate([Loantransactionconstant.COMPOUND_INTEREST_PRODUCT_CHARGES_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.ciProductId) } });
        break;
      case 4:
        this.router.navigate([Loantransactionconstant.COMPOUND_INTEREST_PROD_PURPOSE_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.ciProductId) } });
        break;
      case 5:
        this.router.navigate([Loantransactionconstant.COMPOUND_INTEREST_REQUIRED_DOCUMENT_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.ciProductId) } });
        break;
    }
  }
}
