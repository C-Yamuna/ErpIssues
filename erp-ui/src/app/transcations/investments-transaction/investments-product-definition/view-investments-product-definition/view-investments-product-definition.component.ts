import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { InvestmentsProductDefinitionService } from '../shared/investments-product-definition.service';
import { InvestmentsTransactionConstant } from '../../investments-transaction-constants';
import { ProductComponent } from '../add-investments-product-definition/product/product.component';
import { InvestmentsProductDefinition } from '../shared/investments-product-definition.model';
import { InterestPolicy } from '../add-investments-product-definition/interest-policy/shared/interest-policy.model';
import { RequiredDocuments } from '../add-investments-product-definition/required-documents/shared/required-documents.model';
import { AssociatedBankDetails } from '../add-investments-product-definition/associated-bank-details/shared/associated-bank-details.model';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-view-investments-product-definition',
  templateUrl: './view-investments-product-definition.component.html',
  styleUrls: ['./view-investments-product-definition.component.css']
})
export class ViewInvestmentsProductDefinitionComponent {
  investmentsProductDefinitionModel: InvestmentsProductDefinition = new InvestmentsProductDefinition();
  associatedBankDetailsModel: AssociatedBankDetails = new AssociatedBankDetails();
  interestPolicyModel: InterestPolicy = new InterestPolicy();
  requiredDocumentsModel: RequiredDocuments = new RequiredDocuments();
  associatedBankList: any[] = [];
  interestPolicyList: any[] = [];
  requiredDocumentsList: any[] = [];
  statusList: any[] = [];
  responseModel!: Responsemodel;
  msgs: any[] = [];
  isEdit: any;
  buttonDisabled?: any;
  orgnizationSetting: any;
  countryList: any[] = [];
  memberLandDetails: any;
  productId: any;
  editbtn: Boolean = true;
  isShowSubmit: boolean =applicationConstants.FALSE;
  constructor(private commonComponent: CommonComponent, private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute, private encryptService: EncryptDecryptService, private datePipe: DatePipe,
    private router: Router, private commonFunctionsService: CommonFunctionsService, private translate: TranslateService,
    private investmentsProductDefinitionService: InvestmentsProductDefinitionService,) {

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
          this.productId = this.encryptService.decrypt(params['id']);
          if (params['editbtn'] != undefined && params['editbtn'] != null) {
            let isEditParam = this.encryptService.decrypt(params['editbtn']);
            if (isEditParam == "1") {
              this.editbtn = true;
            } else {
              this.editbtn = false;
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
          this.isEdit = true;
          this.investmentsProductDefinitionService.getPreviewByProductId(this.productId).subscribe(res => {
            this.responseModel = res;
            if (this.responseModel != null && this.responseModel != undefined) {
              this.investmentsProductDefinitionModel = this.responseModel.data[0];
              if (null != this.investmentsProductDefinitionModel.effectiveStartDate)
                this.investmentsProductDefinitionModel.effectiveStartDate = this.datePipe.transform(this.investmentsProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
              if (null != this.investmentsProductDefinitionModel.effectiveEndDate)
                this.investmentsProductDefinitionModel.effectiveEndDate = this.datePipe.transform(this.investmentsProductDefinitionModel.effectiveEndDate, this.orgnizationSetting.datePipe);

              if (this.investmentsProductDefinitionModel.productAssociatedBankDetailsDTOList != null && this.investmentsProductDefinitionModel.productAssociatedBankDetailsDTOList.length > 0) {
                this.associatedBankList = this.investmentsProductDefinitionModel.productAssociatedBankDetailsDTOList;
              }

              if (this.investmentsProductDefinitionModel.interestPolicyConfigDTO != null && this.investmentsProductDefinitionModel.interestPolicyConfigDTO.length > 0) {
                this.interestPolicyList = this.investmentsProductDefinitionModel.interestPolicyConfigDTO;
                this.interestPolicyList = this.interestPolicyList.filter((data:any) => data !=null &&data.effectiveStartDate !=null).map((object:any) => {
                  object.effectiveStartDate = this.datePipe.transform(object.effectiveStartDate, this.orgnizationSetting.datePipe);
                  return object;
                });
              }

              if (this.investmentsProductDefinitionModel.requiredDocumentsDTO != null && this.investmentsProductDefinitionModel.requiredDocumentsDTO.length > 0) {
                this.requiredDocumentsList = this.investmentsProductDefinitionModel.requiredDocumentsDTO;
                this.requiredDocumentsList = this.requiredDocumentsList.filter((data:any) => data !=null &&data.effectiveStartDate !=null).map((object:any) => {
                  object.effectiveStartDate = this.datePipe.transform(object.effectiveStartDate, this.orgnizationSetting.datePipe);
                  return object;
                });
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
      this.router.navigate([InvestmentsTransactionConstant.INVESTMENTS_PRODUCT_DEFINITION]);
  }
  submit() {
    this.msgs = [];  
    this.msgs = [{ severity: "success", detail:  applicationConstants.INVESTMENTS_PRODUCT_DEFINITION }];
    setTimeout(() => {
      this.router.navigate([InvestmentsTransactionConstant.INVESTMENTS_PRODUCT_DEFINITION]);
    }, 1500);
  }
  editInvestmentsProductDefinationdetails(rowData: any, activeIndex: any) {
    switch (activeIndex) {
      case 0:
        this.router.navigate([InvestmentsTransactionConstant.INVESTMENTS_PRODUCT], { queryParams: { id: this.encryptService.encrypt(rowData.productId) } });
        break;
      case 1:
        this.router.navigate([InvestmentsTransactionConstant.INVESTMENTS_AASOCIATED_BANK_DETAILS], { queryParams: { id: this.encryptService.encrypt(rowData.productId) } });
        break;
      case 2:
        this.router.navigate([InvestmentsTransactionConstant.INVESTMENTS_INTEREST_POLICY], { queryParams: { id: this.encryptService.encrypt(rowData.productId) } });
        break;
      case 3:
        this.router.navigate([InvestmentsTransactionConstant.INVESTMENTS_REQUIRED_DOCUMENTS], { queryParams: { id: this.encryptService.encrypt(rowData.productId) } });
        break;
    }
  }

}
