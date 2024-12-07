import { Component } from '@angular/core';
import { SaoProductDefinition } from '../shared/sao-product-definition.model';
import { SaoInterestPolicyConfig } from '../sao-product-definition-stepper/sao-interest-policy-conig/shared/sao-interest-policy-config.model';
import { SaoLoanLinkedShareCapital } from '../sao-product-definition-stepper/sao-loan-linked-share-capital/shared/sao-loan-linked-share-capital.model';
import { SaoProductCharges } from '../sao-product-definition-stepper/sao-product-charges-config/shared/sao-product-charges.model';
import { SaoRequiredDocuments } from '../sao-product-definition-stepper/sao-required-documents-config/shared/sao-required-documents.model';
import { SaoProdPurpose } from '../sao-product-definition-stepper/sao-prod-purpose-config/shared/sao-prod-purpose.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { SaoProductDefinitionsService } from '../shared/sao-product-definitions.service';
import { Loantransactionconstant } from '../../../loan-transaction-constant';

@Component({
  selector: 'app-view-sao-product-definition',
  templateUrl: './view-sao-product-definition.component.html',
  styleUrls: ['./view-sao-product-definition.component.css']
})
export class ViewSaoProductDefinitionComponent {
  saoProductDefinitionModel: SaoProductDefinition = new SaoProductDefinition();
  saoInterestPolicyConfigModel: SaoInterestPolicyConfig = new SaoInterestPolicyConfig();
  saoLoanLinkedShareCapitalModel: SaoLoanLinkedShareCapital = new SaoLoanLinkedShareCapital();
  saoProductChargesModel: SaoProductCharges = new SaoProductCharges();
  saoProdPurposesModel: SaoProdPurpose = new SaoProdPurpose();
  saoRequiredDocumentsModel: SaoRequiredDocuments = new SaoRequiredDocuments();
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
  saoProductId: any;
  editbtn: Boolean = applicationConstants.TRUE;
  isShowSubmit: boolean =applicationConstants.FALSE;
  constructor(private commonComponent: CommonComponent, private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute, private encryptService: EncryptDecryptService, private datePipe: DatePipe,
    private router: Router, private commonFunctionsService: CommonFunctionsService, private translate: TranslateService,
    private saoProductDefinitionsService: SaoProductDefinitionsService,) {

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
          this.saoProductId = this.encryptService.decrypt(params['id']);
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
          this.saoProductDefinitionsService.getPreviewDetailsByProductId(this.saoProductId).subscribe(res => {
            this.responseModel = res;
            if (this.responseModel != null && this.responseModel != undefined) {
              this.saoProductDefinitionModel = this.responseModel.data[0];
              if (null != this.saoProductDefinitionModel.effectiveStartDate && undefined != this.saoProductDefinitionModel.effectiveStartDate)
                this.saoProductDefinitionModel.effectiveStartDate = this.datePipe.transform(this.saoProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
            
              if (this.saoProductDefinitionModel.saoProdCollateralsConfigList) {
                this.collateralList = this.saoProductDefinitionModel.saoProdCollateralsConfigList
                  .filter((item: any) => item != null && item.status === applicationConstants.ACTIVE) 
                  .map((item: { collateralTypeName: string, collateralType: any }) => ({
                    label: item.collateralTypeName,
                    value: item.collateralType
                  }));
              }
            
            
              if (this.saoProductDefinitionModel.saoInterestPolicyConfigDtoList != null && this.saoProductDefinitionModel.saoInterestPolicyConfigDtoList != undefined && this.saoProductDefinitionModel.saoInterestPolicyConfigDtoList.length > 0) {
                this.interestPolicyList = this.saoProductDefinitionModel.saoInterestPolicyConfigDtoList;
                this.interestPolicyList = this.interestPolicyList.filter((data: any) => data != null && data.effectiveStartDate != null).map((object: any) => {
                  object.effectiveStartDate = this.datePipe.transform(object.effectiveStartDate, this.orgnizationSetting.datePipe);
                  return object;
                });
              }
              if (this.saoProductDefinitionModel.saoApportionConfigDTOList != null && this.saoProductDefinitionModel.saoApportionConfigDTOList != undefined && this.saoProductDefinitionModel.saoApportionConfigDTOList.length > 0) {
                this.collectionOrderList = this.saoProductDefinitionModel.saoApportionConfigDTOList;
                this.collectionOrderList = this.collectionOrderList.filter((data: any) => data != null && data.effectiveStartDate != null).map((object: any) => {
                  object.effectiveStartDate = this.datePipe.transform(object.effectiveStartDate, this.orgnizationSetting.datePipe);
                  return object;
                });
              }
              if (this.saoProductDefinitionModel.saoLoanLinkedSharecapitalConfigList != null && this.saoProductDefinitionModel.saoLoanLinkedSharecapitalConfigList != undefined && this.saoProductDefinitionModel.saoLoanLinkedSharecapitalConfigList.length > 0) {
                this.linkedShareCapitalList = this.saoProductDefinitionModel.saoLoanLinkedSharecapitalConfigList;
                this.linkedShareCapitalList = this.linkedShareCapitalList.filter((data: any) => data != null && data.effectiveStartDate != null).map((object: any) => {
                  object.effectiveStartDate = this.datePipe.transform(object.effectiveStartDate, this.orgnizationSetting.datePipe);
                  return object;
                });
              }

              if (this.saoProductDefinitionModel.saoProductChargesConfigDTOList != null && this.saoProductDefinitionModel.saoProductChargesConfigDTOList != undefined && this.saoProductDefinitionModel.saoProductChargesConfigDTOList.length > 0) {
                this.chargesList = this.saoProductDefinitionModel.saoProductChargesConfigDTOList;
                this.chargesList = this.chargesList.filter((data: any) => data != null && data.effectiveStartDate != null).map((object: any) => {
                  object.effectiveStartDate = this.datePipe.transform(object.effectiveStartDate, this.orgnizationSetting.datePipe);
                  return object;
                });
              }
              if (this.saoProductDefinitionModel.saoProdPurPoseConfgList != null && this.saoProductDefinitionModel.saoProdPurPoseConfgList != undefined && this.saoProductDefinitionModel.saoProdPurPoseConfgList.length > 0) {
                this.purposeList = this.saoProductDefinitionModel.saoProdPurPoseConfgList;
                this.purposeList = this.purposeList.filter((data: any) => data != null && data.effectiveStartDate != null).map((object: any) => {
                  object.effectiveStartDate = this.datePipe.transform(object.effectiveStartDate, this.orgnizationSetting.datePipe);
                  return object;
                });
              }

              if (this.saoProductDefinitionModel.saoRequiredDocumentsConfigDTOList != null && this.saoProductDefinitionModel.saoRequiredDocumentsConfigDTOList != undefined && this.saoProductDefinitionModel.saoRequiredDocumentsConfigDTOList.length > 0) {
                this.requiredDocumentsList = this.saoProductDefinitionModel.saoRequiredDocumentsConfigDTOList;
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
  submit() {
    this.msgs = [];  
    this.msgs = [{ severity: "success", detail:  applicationConstants.SAO_LOAN_PRODUCT_DEFINITION }];
    setTimeout(() => {
      this.router.navigate([Loantransactionconstant.SAO_PRODUCT_DEFINITION]);
    }, 1500);
  }
  navigateToBack() {
      this.router.navigate([Loantransactionconstant.SAO_PRODUCT_DEFINITION]);
  }
  editSaoLoansproductDefinationdetails(rowData: any, activeIndex: any) {
    switch (activeIndex) {
      case 0:
        this.router.navigate([Loantransactionconstant.SAO_PRODUCT_CONFIGURATION], { queryParams: { id: this.encryptService.encrypt(rowData.saoProductId) } });
        break;
      case 1:
        this.router.navigate([Loantransactionconstant.SAO_INTEREST_POLICY_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.saoProductId) } });
        break;
      case 2:
        this.router.navigate([Loantransactionconstant.SAO_LOAN_LINKED_SHARE_CAPITAL], { queryParams: { id: this.encryptService.encrypt(rowData.saoProductId) } });
        break;
      case 3:
        this.router.navigate([Loantransactionconstant.SAO_PRODUCT_CHARGES_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.saoProductId) } });
        break;
      case 4:
        this.router.navigate([Loantransactionconstant.SAO_PROD_PURPOSE_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.saoProductId) } });
        break;
      case 5:
        this.router.navigate([Loantransactionconstant.SAO_REQUIRED_DOCUMENT_CONFIG], { queryParams: { id: this.encryptService.encrypt(rowData.saoProductId) } });
        break;
    }
  }
}
