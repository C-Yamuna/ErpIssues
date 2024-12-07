import { Component } from '@angular/core';
import { BorrowingTransactionConstant } from '../../../borrowing-transaction-constants';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { TermBorrowingProductDefinition } from '../shared/term-borrowing-product-definition.model';
import { TermInterestPolicy } from '../term-borrowing-product-definition-stepper/term-interest-policy/shared/term-interest-policy.model';
import { TermLinkedShareCapital } from '../term-borrowing-product-definition-stepper/term-linked-share-capital/shared/term-linked-share-capital.model';
import { TermCharges } from '../term-borrowing-product-definition-stepper/term-charges/shared/term-charges.model';
import { TermPurpose } from '../term-borrowing-product-definition-stepper/term-purpose/shared/term-purpose.model';
import { TermRequiredDocuments } from '../term-borrowing-product-definition-stepper/term-required-documents/shared/term-required-documents.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { TranslateService } from '@ngx-translate/core';
import { TermBorrowingProductDefinitionService } from '../shared/term-borrowing-product-definition.service';

@Component({
  selector: 'app-view-term-borrowing-product-definition',
  templateUrl: './view-term-borrowing-product-definition.component.html',
  styleUrls: ['./view-term-borrowing-product-definition.component.css']
})
export class ViewTermBorrowingProductDefinitionComponent {
  termProductDefinitionModel :TermBorrowingProductDefinition = new TermBorrowingProductDefinition();
  termInterestPolicyConfigModel :TermInterestPolicy = new TermInterestPolicy();
  termLinkedShareCapitalModel :TermLinkedShareCapital = new TermLinkedShareCapital();
  termProductChargesModel : TermCharges = new TermCharges();
  termProdPurposesModel : TermPurpose = new TermPurpose();
  termRequiredDocumentsModel : TermRequiredDocuments = new TermRequiredDocuments();
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
    private termBorrowingProductDefinitionService : TermBorrowingProductDefinitionService,) {

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
          this.termBorrowingProductDefinitionService.getPreviewByProductId(this.id).subscribe(res => {
            this.responseModel = res;
            if (this.responseModel != null && this.responseModel != undefined) {
              this.termProductDefinitionModel = this.responseModel.data[0];
              if (null != this.termProductDefinitionModel.effectiveStartDate && undefined != this.termProductDefinitionModel.effectiveStartDate)
                this.termProductDefinitionModel.effectiveStartDate = this.datePipe.transform(this.termProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
              if (this.termProductDefinitionModel.termInterestPolicyConfigDTO != null && this.termProductDefinitionModel.termInterestPolicyConfigDTO != undefined && this.termProductDefinitionModel.termInterestPolicyConfigDTO.length > 0) {
                this.interestPolicyList = this.termProductDefinitionModel.termInterestPolicyConfigDTO;
               
              }
              if (this.termProductDefinitionModel.termProductApportionConfigDTO != null && this.termProductDefinitionModel.termProductApportionConfigDTO != undefined && this.termProductDefinitionModel.termProductApportionConfigDTO.length > 0) {
                this.collectionOrderList = this.termProductDefinitionModel.termProductApportionConfigDTO;
               
              }
              if (this.termProductDefinitionModel.termBorrowingLinkedSharecapitalConfigDTO != null && this.termProductDefinitionModel.termBorrowingLinkedSharecapitalConfigDTO != undefined && this.termProductDefinitionModel.termBorrowingLinkedSharecapitalConfigDTO.length > 0) {
                this.linkedShareCapitalList = this.termProductDefinitionModel.termBorrowingLinkedSharecapitalConfigDTO;
               
              }

              if (this.termProductDefinitionModel.termProductChargesConfigDTO != null && this.termProductDefinitionModel.termProductChargesConfigDTO != undefined && this.termProductDefinitionModel.termProductChargesConfigDTO.length > 0) {
                this.chargesList = this.termProductDefinitionModel.termProductChargesConfigDTO;
               
              }
              if (this.termProductDefinitionModel.termProductPurposeConfigDTO != null && this.termProductDefinitionModel.termProductPurposeConfigDTO != undefined && this.termProductDefinitionModel.termProductPurposeConfigDTO.length > 0) {
                this.purposeList = this.termProductDefinitionModel.termProductPurposeConfigDTO;
                
              }

              if (this.termProductDefinitionModel.termProductRequiredDocumentsConfigDTO != null && this.termProductDefinitionModel.termProductRequiredDocumentsConfigDTO != undefined && this.termProductDefinitionModel.termProductRequiredDocumentsConfigDTO.length > 0) {
                this.requiredDocumentsList = this.termProductDefinitionModel.termProductRequiredDocumentsConfigDTO;
               
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
   
      this.router.navigate([BorrowingTransactionConstant.TERM_PRODUCT_DEFINITION]);
  }
  submit() {
    this.msgs = [];  
    this.msgs = [{ severity: "success", detail:  applicationConstants.TERM_BORROWING_PRODUCT_DEFINITION }];
    setTimeout(() => {
      this.router.navigate([BorrowingTransactionConstant.TERM_PRODUCT_DEFINITION]);
    }, 1500);
  }
  editTermBorrowingsproductDefinationdetails(rowData: any, activeIndex: any) {
    switch (activeIndex) {
      case 0:
        this.router.navigate([BorrowingTransactionConstant.TERM_PRODUCT_CONFIGURATION], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 1:
        this.router.navigate([BorrowingTransactionConstant.TERM_INTEREST_POLICY_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 2:
        this.router.navigate([BorrowingTransactionConstant.TERM_LINKED_SHARE_CAPITAL], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 3:
        this.router.navigate([BorrowingTransactionConstant.TERM_PRODUCT_CHARGES_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 4:
        this.router.navigate([BorrowingTransactionConstant.TERM_PROD_PURPOSE_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 5:
        this.router.navigate([BorrowingTransactionConstant.TERM_REQUIRED_DOCUMENT_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
    }
  }
}
