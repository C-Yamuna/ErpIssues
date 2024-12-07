import { Component } from '@angular/core';
import { SiBorrowingProductDefinition } from '../shared/si-borrowing-product-definition.model';
import { SiInterestPolicy } from '../si-borrowing-product-definition-stepper/si-interest-policy/shared/si-interest-policy.model';
import { SiLinkedShareCapital } from '../si-borrowing-product-definition-stepper/si-linked-share-capital/shared/si-linked-share-capital.model';
import { SiCharges } from '../si-borrowing-product-definition-stepper/si-charges/shared/si-charges.model';
import { SiPurpose } from '../si-borrowing-product-definition-stepper/si-purpose/shared/si-purpose.model';
import { SiRequiredDocuments } from '../si-borrowing-product-definition-stepper/si-required-documents/shared/si-required-documents.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { DatePipe } from '@angular/common';
import { SiBorrowingProductDefinitionService } from '../shared/si-borrowing-product-definition.service';
import { BorrowingTransactionConstant } from '../../../borrowing-transaction-constants';

@Component({
  selector: 'app-view-si-borrowing-product-definition',
  templateUrl: './view-si-borrowing-product-definition.component.html',
  styleUrls: ['./view-si-borrowing-product-definition.component.css']
})
export class ViewSiBorrowingProductDefinitionComponent {
  siProductDefinitionModel :SiBorrowingProductDefinition = new SiBorrowingProductDefinition();
  siInterestPolicyConfigModel :SiInterestPolicy = new SiInterestPolicy();
  siLinkedShareCapitalModel :SiLinkedShareCapital = new SiLinkedShareCapital();
  siProductChargesModel : SiCharges = new SiCharges();
  siProdPurposesModel : SiPurpose = new SiPurpose();
  siRequiredDocumentsModel : SiRequiredDocuments = new SiRequiredDocuments();
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
    private siBorrowingProductDefinitionService : SiBorrowingProductDefinitionService,) {

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
          this.siBorrowingProductDefinitionService.getPreviewByProductId(this.id).subscribe(res => {
            this.responseModel = res;
            if (this.responseModel != null && this.responseModel != undefined) {
              this.siProductDefinitionModel = this.responseModel.data[0];
              if (null != this.siProductDefinitionModel.effectiveStartDate && undefined != this.siProductDefinitionModel.effectiveStartDate)
                this.siProductDefinitionModel.effectiveStartDate = this.datePipe.transform(this.siProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
              if (this.siProductDefinitionModel.siInterestPolicyConfigDTO != null && this.siProductDefinitionModel.siInterestPolicyConfigDTO != undefined && this.siProductDefinitionModel.siInterestPolicyConfigDTO.length > 0) {
                this.interestPolicyList = this.siProductDefinitionModel.siInterestPolicyConfigDTO;
                
              }
              if (this.siProductDefinitionModel.siProductApportionConfigDTO != null && this.siProductDefinitionModel.siProductApportionConfigDTO != undefined && this.siProductDefinitionModel.siProductApportionConfigDTO.length > 0) {
                this.collectionOrderList = this.siProductDefinitionModel.siProductApportionConfigDTO;
                
              }
              if (this.siProductDefinitionModel.siBorrowingLinkedSharecapitalConfigDTO != null && this.siProductDefinitionModel.siBorrowingLinkedSharecapitalConfigDTO != undefined && this.siProductDefinitionModel.siBorrowingLinkedSharecapitalConfigDTO.length > 0) {
                this.linkedShareCapitalList = this.siProductDefinitionModel.siBorrowingLinkedSharecapitalConfigDTO;
               
              }

              if (this.siProductDefinitionModel.siProductChargesConfigDTO != null && this.siProductDefinitionModel.siProductChargesConfigDTO != undefined && this.siProductDefinitionModel.siProductChargesConfigDTO.length > 0) {
                this.chargesList = this.siProductDefinitionModel.siProductChargesConfigDTO;
              
              }
              if (this.siProductDefinitionModel.siProductPurposeConfigDTO != null && this.siProductDefinitionModel.siProductPurposeConfigDTO != undefined && this.siProductDefinitionModel.siProductPurposeConfigDTO.length > 0) {
                this.purposeList = this.siProductDefinitionModel.siProductPurposeConfigDTO;
                
              }

              if (this.siProductDefinitionModel.siProductRequiredDocumentsConfigDTO != null && this.siProductDefinitionModel.siProductRequiredDocumentsConfigDTO != undefined && this.siProductDefinitionModel.siProductRequiredDocumentsConfigDTO.length > 0) {
                this.requiredDocumentsList = this.siProductDefinitionModel.siProductRequiredDocumentsConfigDTO;
               
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
      this.router.navigate([BorrowingTransactionConstant.SI_PRODUCT_DEFINITION]);
  }
  submit() {
    this.msgs = [];  
    this.msgs = [{ severity: "success", detail:  applicationConstants.SI_BORROWING_PRODUCT_DEFINITION }];
    setTimeout(() => {
      this.router.navigate([BorrowingTransactionConstant.SI_PRODUCT_DEFINITION]);
    }, 1500);
  }
  editSiBorrowingsproductDefinationdetails(rowData: any, activeIndex: any) {
    switch (activeIndex) {
      case 0:
        this.router.navigate([BorrowingTransactionConstant.SI_PRODUCT_CONFIGURATION], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 1:
        this.router.navigate([BorrowingTransactionConstant.SI_INTEREST_POLICY_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 2:
        this.router.navigate([BorrowingTransactionConstant.SI_LINKED_SHARE_CAPITAL], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 3:
        this.router.navigate([BorrowingTransactionConstant.SI_PRODUCT_CHARGES_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 4:
        this.router.navigate([BorrowingTransactionConstant.SI_PROD_PURPOSE_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 5:
        this.router.navigate([BorrowingTransactionConstant.SI_REQUIRED_DOCUMENT_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
    }
  }
}
