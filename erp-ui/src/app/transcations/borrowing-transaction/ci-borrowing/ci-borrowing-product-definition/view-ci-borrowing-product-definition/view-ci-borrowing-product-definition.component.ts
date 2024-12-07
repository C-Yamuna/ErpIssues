import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CiBorrowingProductDefinitionService } from '../shared/ci-borrowing-product-definition.service';
import { CiBorrowingProductDefinition } from '../shared/ci-borrowing-product-definition.model';
import { BorrowingTransactionConstant } from '../../../borrowing-transaction-constants';
import { CiCharges } from '../ci-borrowing-product-definition-stepper/ci-charges/shared/ci-charges.model';
import { CiInterestPolicy } from '../ci-borrowing-product-definition-stepper/ci-interest-policy/shared/ci-interest-policy.model';
import { CiLinkedShareCapital } from '../ci-borrowing-product-definition-stepper/ci-linked-share-capital/shared/ci-linked-share-capital.model';
import { CiPurpose } from '../ci-borrowing-product-definition-stepper/ci-purpose/shared/ci-purpose.model';
import { CiRequiredDocuments } from '../ci-borrowing-product-definition-stepper/ci-required-documents/shared/ci-required-documents.model';

@Component({
  selector: 'app-view-ci-borrowing-product-definition',
  templateUrl: './view-ci-borrowing-product-definition.component.html',
  styleUrls: ['./view-ci-borrowing-product-definition.component.css']
})
export class ViewCiBorrowingProductDefinitionComponent {
  ciProductDefinitionModel :CiBorrowingProductDefinition = new CiBorrowingProductDefinition();
  ciInterestPolicyConfigModel :CiInterestPolicy = new CiInterestPolicy();
  ciLinkedShareCapitalModel :CiLinkedShareCapital = new CiLinkedShareCapital();
  ciProductChargesModel : CiCharges = new CiCharges();
  ciProdPurposesModel : CiPurpose = new CiPurpose();
  ciRequiredDocumentsModel : CiRequiredDocuments = new CiRequiredDocuments();
  interestPolicyList: any[] = [];
  requiredDocumentsList: any[] = [];
  chargesList: any[] = [];
  purposeList: any[] = [];
  linkedShareCapitalList: any[] = [];
  statusList: any[] = [];
  interestPostingFrequencyList: any[] = [];
  responseModel!: Responsemodel;
  msgs: any[] = [];
  repaymentFrequencyList: any[] = [];
  borrowingTypeList: any[] = [];
  interestCalculationTypeList: any[] = [];
  collectionOrderList: any[] = [];
  isEdit: any;
  buttonDisabled?: any;
  orgnizationSetting: any;
  memberLandDetails: any;
  id: any;
  editbtn: Boolean = applicationConstants.TRUE;
  isShowSubmit: boolean =applicationConstants.FALSE;
  constructor(private commonComponent: CommonComponent, private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute, private encryptService: EncryptDecryptService, private datePipe: DatePipe,
    private router: Router, private commonFunctionsService: CommonFunctionsService, private translate: TranslateService,
    private ciBorrowingProductDefinitionService : CiBorrowingProductDefinitionService,) {

  }
  ngOnInit(): void {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.repaymentFrequencyList = this.commonComponent.rePaymentFrequency();
    this.borrowingTypeList = this.commonComponent.borrowingTypes();
    this.interestCalculationTypeList = this.commonComponent.interestCalculationType();
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
          this.id = this.encryptService.decrypt(params['id']);
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
          this.ciBorrowingProductDefinitionService.getPreviewByProductId(this.id).subscribe(res => {
            this.responseModel = res;
            if (this.responseModel != null && this.responseModel != undefined) {
              this.ciProductDefinitionModel = this.responseModel.data[0];
              if (null != this.ciProductDefinitionModel.effectiveStartDate && undefined != this.ciProductDefinitionModel.effectiveStartDate)
                this.ciProductDefinitionModel.effectiveStartDate = this.datePipe.transform(this.ciProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
              if (this.ciProductDefinitionModel.ciInterestPolicyConfigDTO != null && this.ciProductDefinitionModel.ciInterestPolicyConfigDTO != undefined && this.ciProductDefinitionModel.ciInterestPolicyConfigDTO.length > 0) {
                this.interestPolicyList = this.ciProductDefinitionModel.ciInterestPolicyConfigDTO;
                
              }
              if (this.ciProductDefinitionModel.ciProductApportionConfigDTO != null && this.ciProductDefinitionModel.ciProductApportionConfigDTO != undefined && this.ciProductDefinitionModel.ciProductApportionConfigDTO.length > 0) {
                this.collectionOrderList = this.ciProductDefinitionModel.ciProductApportionConfigDTO;
               
              }
              if (this.ciProductDefinitionModel.ciBorrowingLinkedSharecapitalConfigDTO != null && this.ciProductDefinitionModel.ciBorrowingLinkedSharecapitalConfigDTO != undefined && this.ciProductDefinitionModel.ciBorrowingLinkedSharecapitalConfigDTO.length > 0) {
                this.linkedShareCapitalList = this.ciProductDefinitionModel.ciBorrowingLinkedSharecapitalConfigDTO;
               
              }

              if (this.ciProductDefinitionModel.ciProductChargesConfigDTO != null && this.ciProductDefinitionModel.ciProductChargesConfigDTO != undefined && this.ciProductDefinitionModel.ciProductChargesConfigDTO.length > 0) {
                this.chargesList = this.ciProductDefinitionModel.ciProductChargesConfigDTO;
               
              }
              if (this.ciProductDefinitionModel.ciProductPurposeConfigDTO != null && this.ciProductDefinitionModel.ciProductPurposeConfigDTO != undefined && this.ciProductDefinitionModel.ciProductPurposeConfigDTO.length > 0) {
                this.purposeList = this.ciProductDefinitionModel.ciProductPurposeConfigDTO;
               
              }

              if (this.ciProductDefinitionModel.ciProductRequiredDocumentsConfigDTO != null && this.ciProductDefinitionModel.ciProductRequiredDocumentsConfigDTO != undefined && this.ciProductDefinitionModel.ciProductRequiredDocumentsConfigDTO.length > 0) {
                this.requiredDocumentsList = this.ciProductDefinitionModel.ciProductRequiredDocumentsConfigDTO;
                
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
   
      this.router.navigate([BorrowingTransactionConstant.CI_PRODUCT_DEFINITION]);
  }
  submit() {
    this.msgs = [];  
    this.msgs = [{ severity: "success", detail:  applicationConstants.CI_BORROWING__PRODUCT_DEFINITION }];
    setTimeout(() => {
      this.router.navigate([BorrowingTransactionConstant.CI_PRODUCT_DEFINITION]);
    }, 1500);
  }
  editCiBorrowingsproductDefinationdetails(rowData: any, activeIndex: any) {
    switch (activeIndex) {
      case 0:
        this.router.navigate([BorrowingTransactionConstant.CI_PRODUCT_CONFIGURATION], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 1:
        this.router.navigate([BorrowingTransactionConstant.CI_INTEREST_POLICY_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 2:
        this.router.navigate([BorrowingTransactionConstant.CI_LINKED_SHARE_CAPITAL], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 3:
        this.router.navigate([BorrowingTransactionConstant.CI_PRODUCT_CHARGES_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 4:
        this.router.navigate([BorrowingTransactionConstant.CI_PROD_PURPOSE_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 5:
        this.router.navigate([BorrowingTransactionConstant.CI_REQUIRED_DOCUMENT_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
    }
  }
}
