import { Component } from '@angular/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { BorrowingTransactionConstant } from '../../../borrowing-transaction-constants';
import { SaoBorrowingProductDefinition } from '../shared/sao-borrowing-product-definition.model';
import { SaoCollectionApportionOrder, SaoInterestPolicy } from '../sao-borrowing-product-definition-stepper/sao-interest-policy-config/shared/sao-interest-policy.model';
import { SaoLinkedShareCapital } from '../sao-borrowing-product-definition-stepper/sao-linked-share-capital/shared/sao-linked-share-capital.model';
import { SaoCharges } from '../sao-borrowing-product-definition-stepper/sao-charges-config/shared/sao-charges.model';
import { SaoPurpose } from '../sao-borrowing-product-definition-stepper/sao-purpose-config/shared/sao-purpose.model';
import { SaoRequiredDocuments } from '../sao-borrowing-product-definition-stepper/sao-required-documents/shared/sao-required-documents.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { SaoBorrowingProductDefinitionService } from '../shared/sao-borrowing-product-definition.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-view-sao-borrowing-product-definition',
  templateUrl: './view-sao-borrowing-product-definition.component.html',
  styleUrls: ['./view-sao-borrowing-product-definition.component.css']
})
export class ViewSaoBorrowingProductDefinitionComponent {
  saoProductDefinitionModel :SaoBorrowingProductDefinition = new SaoBorrowingProductDefinition();
  saoInterestPolicyConfigModel :SaoInterestPolicy = new SaoInterestPolicy();
  saoLinkedShareCapitalModel :SaoLinkedShareCapital = new SaoLinkedShareCapital();
  saoProductChargesModel : SaoCharges = new SaoCharges();
  saoProdPurposesModel : SaoPurpose = new SaoPurpose();
  saoRequiredDocumentsModel : SaoRequiredDocuments = new SaoRequiredDocuments();
  saoCollectionApportionOrderModel:SaoCollectionApportionOrder = new SaoCollectionApportionOrder();
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
    private saoBorrowingProductDefinitionService : SaoBorrowingProductDefinitionService,) {

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
          this.saoBorrowingProductDefinitionService.getPreviewByProductId(this.id).subscribe(res => {
            this.responseModel = res;
            if (this.responseModel != null && this.responseModel != undefined) {
              this.saoProductDefinitionModel = this.responseModel.data[0];
              if (null != this.saoProductDefinitionModel.effectiveStartDate && undefined != this.saoProductDefinitionModel.effectiveStartDate)
                this.saoProductDefinitionModel.effectiveStartDate = this.datePipe.transform(this.saoProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
              if (this.saoProductDefinitionModel.saoInterestPolicyConfigDTO != null && this.saoProductDefinitionModel.saoInterestPolicyConfigDTO != undefined && this.saoProductDefinitionModel.saoInterestPolicyConfigDTO.length > 0) {
                this.interestPolicyList = this.saoProductDefinitionModel.saoInterestPolicyConfigDTO;
               
              }
              if (this.saoProductDefinitionModel.saoProductApportionConfigDTO != null && this.saoProductDefinitionModel.saoProductApportionConfigDTO != undefined && this.saoProductDefinitionModel.saoProductApportionConfigDTO.length > 0) {
                this.collectionOrderList = this.saoProductDefinitionModel.saoProductApportionConfigDTO;
               
              }
              if (this.saoProductDefinitionModel.saoBorrowingLinkedSharecapitalConfigDTO != null && this.saoProductDefinitionModel.saoBorrowingLinkedSharecapitalConfigDTO != undefined && this.saoProductDefinitionModel.saoBorrowingLinkedSharecapitalConfigDTO.length > 0) {
                this.linkedShareCapitalList = this.saoProductDefinitionModel.saoBorrowingLinkedSharecapitalConfigDTO;
               
              }

              if (this.saoProductDefinitionModel.saoProductChargesConfigDTO != null && this.saoProductDefinitionModel.saoProductChargesConfigDTO != undefined && this.saoProductDefinitionModel.saoProductChargesConfigDTO.length > 0) {
                this.chargesList = this.saoProductDefinitionModel.saoProductChargesConfigDTO;
               
              }
              if (this.saoProductDefinitionModel.saoProductPurposeConfigDTO != null && this.saoProductDefinitionModel.saoProductPurposeConfigDTO != undefined && this.saoProductDefinitionModel.saoProductPurposeConfigDTO.length > 0) {
                this.purposeList = this.saoProductDefinitionModel.saoProductPurposeConfigDTO;
               
              }

              if (this.saoProductDefinitionModel.saoProductRequiredDocumentsConfigDTO != null && this.saoProductDefinitionModel.saoProductRequiredDocumentsConfigDTO != undefined && this.saoProductDefinitionModel.saoProductRequiredDocumentsConfigDTO.length > 0) {
                this.requiredDocumentsList = this.saoProductDefinitionModel.saoProductRequiredDocumentsConfigDTO;
                
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
      this.router.navigate([BorrowingTransactionConstant.SAO_PRODUCT_DEFINITION]);
  }
  submit() {
    this.msgs = [];  
    this.msgs = [{ severity: "success", detail:  applicationConstants.SAO_BORROWING_PRODUCT_DEFINITION }];
    setTimeout(() => {
      this.router.navigate([BorrowingTransactionConstant.SAO_PRODUCT_DEFINITION]);
    }, 1500);
  }
  editSaoBorrowingsproductDefinationdetails(rowData: any, activeIndex: any) {
    switch (activeIndex) {
      case 0:
        this.router.navigate([BorrowingTransactionConstant.SAO_PRODUCT_CONFIGURATION], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 1:
        this.router.navigate([BorrowingTransactionConstant.SAO_INTEREST_POLICY_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 2:
        this.router.navigate([BorrowingTransactionConstant.SAO_LINKED_SHARE_CAPITAL], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 3:
        this.router.navigate([BorrowingTransactionConstant.SAO_PRODUCT_CHARGES_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 4:
        this.router.navigate([BorrowingTransactionConstant.SAO_PROD_PURPOSE_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 5:
        this.router.navigate([BorrowingTransactionConstant.SAO_REQUIRED_DOCUMENT_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
    }
  }
}
