import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { InvestmentsTransactionConstant } from '../investments-transaction-constants';
import { InvestmentsProductDefinitionService } from './shared/investments-product-definition.service';

@Component({
  selector: 'app-investments-product-definition',
  templateUrl: './investments-product-definition.component.html',
  styleUrls: ['./investments-product-definition.component.css']
})
export class InvestmentsProductDefinitionComponent implements OnInit {

  responseModel!: Responsemodel;
  investmentsProductDefinition: any[] = [];
  gridListData: any[] = [];
  orgnizationSetting: any;
  msgs: any[] = [];
  showForm: boolean = applicationConstants.FALSE;
  editViewButton: boolean = applicationConstants.FALSE;

  constructor(private router: Router,
    private translate: TranslateService,
    private commonFunctionsService: CommonFunctionsService,
    private encryptDecryptService: EncryptDecryptService,
    private investmentsProductDefinitionService: InvestmentsProductDefinitionService,
    private datePipe: DatePipe,
    private commonComponent: CommonComponent) {

  }

  ngOnInit() {
    this.commonFunctionsService.setStorageValue('language', 'en');
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.commonFunctionsService.data.subscribe((res: any) => {
      if (res) {
        this.translate.use(res);
      } else {
        this.translate.use('en');
      }
    });
    this.investmentsProductDefinition = [
      { field: 'name', header: 'INVESTMENTS_TRANSACTIONS.PRODUCT_NAME' },
      { field: '', header: 'INVESTMENTS_TRANSACTIONS.RATE_OF_INTEREST' },
      { field: 'minDepositAmount', header: 'INVESTMENTS_TRANSACTIONS.MINIMUM_AMOUNT' },
      { field: 'maxDepositAmount', header: 'INVESTMENTS_TRANSACTIONS.MAXIMUM_AMOUNT' },
      { field: 'effectiveStartDate', header: 'INVESTMENTS_TRANSACTIONS.EFFECTIVE_START_DATE' },
      { field: 'status', header: 'INVESTMENTS_TRANSACTIONS.STATUS' }
    ];
    this.getAllInvestmentProductDefinition();

  }
  /**
    @author Bhargavi
    @implements Routes to add Investment Product Defination Stepper
   */
  addInvestment() {
    this.router.navigate([InvestmentsTransactionConstant.INVESTMENTS_PRODUCT]);
  }
  /**
    @author Bhargavi
    @implements Routes to View Investment Product Defination Details
   */
  viewInvestment(rowData: any) {
    this.router.navigate([InvestmentsTransactionConstant.VIEW_INVESTMENTS_PRODUCT_DEFINITION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.productId), editbtn: this.encryptDecryptService.encrypt(0) } });
  }
  /**
    @author Bhargavi
    @implements Routes to Edit Investment Product Definition Stepper
   */
  editInvestment(rowData: any) {
    this.router.navigate([InvestmentsTransactionConstant.VIEW_INVESTMENTS_PRODUCT_DEFINITION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.productId), isGridPage: this.encryptDecryptService.encrypt(0) } });
    this.editViewButton = applicationConstants.TRUE;
  }
  /**
    @author Bhargavi
    @implements Get All Investment product details 
   */
  getAllInvestmentProductDefinition() {
    this.investmentsProductDefinitionService.getAllProducts().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (null != this.responseModel.data && undefined != this.responseModel.data) {
          this.gridListData = this.responseModel.data;
          if (null != this.gridListData && undefined != this.gridListData && this.gridListData.length > 0) {
            this.gridListData = this.gridListData.filter((data: any) => null != data.effectiveStartDate).map(investment => {
              investment.effectiveStartDate = this.datePipe.transform(investment.effectiveStartDate, this.orgnizationSetting.datePipe) || '';
              return investment
            });
          }
        }
        this.commonComponent.stopSpinner();
      } else {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    }, error => {
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
      this.commonComponent.stopSpinner();
    });
  }

    /**
  @author Bhargavi
  @implements To Enable/ Disable search filter form
  */
  onChange() {
    this.showForm = !this.showForm;
  }

}
