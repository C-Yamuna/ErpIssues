import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { DailyDepositsProductDefinitionService } from './shared/daily-deposits-product-definition.service';
import { DatePipe } from '@angular/common';
import { CommonComponent } from 'src/app/shared/common.component';
import { DailyDepositTransactionConstants } from '../daily-deposits-transaction-constants';

@Component({
  selector: 'app-daily-deposits-product-definition',
  templateUrl: './daily-deposits-product-definition.component.html',
  styleUrls: ['./daily-deposits-product-definition.component.css']
})
export class DailyDepositsProductDefinitionComponent {

  responseModel!: Responsemodel;
  dailyDepositProductDefinition: any[] = [];
  gridListData: any[] = [];
  orgnizationSetting: any;
  msgs: any[] = [];
  showForm: boolean = applicationConstants.FALSE;
  editViewButton: boolean = applicationConstants.FALSE;

  constructor(private router: Router,
    private translate: TranslateService,
    private commonFunctionsService: CommonFunctionsService,
    private encryptDecryptService: EncryptDecryptService,
    private dailyDepositsProductDefinitionService: DailyDepositsProductDefinitionService,
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
    this.dailyDepositProductDefinition = [
      { field: 'name', header: 'DAILY_DEPOSIT_TRANSACTION.PRODUCT_NAME' },
      { field: '', header: 'DAILY_DEPOSIT_TRANSACTION.RATE_OF_INTEREST' },
      { field: 'minDepositAmount', header: 'DAILY_DEPOSIT_TRANSACTION.MINIMUM_AMOUNT' },
      { field: 'maxDepositAmount', header: 'DAILY_DEPOSIT_TRANSACTION.MAXIMUM_AMOUNT' },
      { field: 'effectiveStartDate', header: 'DAILY_DEPOSIT_TRANSACTION.EFFECTIVE_START_DATE' },
      { field: 'status', header: 'DAILY_DEPOSIT_TRANSACTION.STATUS' }
    ];
    this.getAllDailyDepositProductDefinition();

  }
  /**
    @author Bhargavi
    @implements Routes to add DailyDeposit Product Defination Stepper
   */
  addDailyDeposit() {
    this.router.navigate([DailyDepositTransactionConstants.DAILY_DEPOSIT_GENERAL_CONFIG]);
  }
  /**
    @author Bhargavi
    @implements Routes to View DailyDeposit Product Defination Details
   */
  viewDailyDeposit(rowData: any) {
    this.router.navigate([DailyDepositTransactionConstants.VIEW_DAILY_DEPOSIT_PRODUCT_DEFINITION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id), editbtn: this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE) } });
  }
  /**
    @author Bhargavi
    @implements Routes to Edit DailyDeposit Product Definition Stepper
   */
  editDailyDeposit(rowData: any) {
    this.router.navigate([DailyDepositTransactionConstants.VIEW_DAILY_DEPOSIT_PRODUCT_DEFINITION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id), isGridPage: this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE) } });
    this.editViewButton = applicationConstants.TRUE;
  }
  /**
    @author Bhargavi
    @implements Get All DailyDeposit product details 
   */
  getAllDailyDepositProductDefinition() {
    this.dailyDepositsProductDefinitionService.getAllDailyDepositsProductDefinition().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (null != this.responseModel.data && undefined != this.responseModel.data) {
          this.gridListData = this.responseModel.data;
          if (null != this.gridListData && undefined != this.gridListData && this.gridListData.length > 0) {
            this.gridListData = this.gridListData.filter((data: any) => null != data.effectiveStartDate).map(DailyDeposit => {
              DailyDeposit.effectiveStartDate = this.datePipe.transform(DailyDeposit.effectiveStartDate, this.orgnizationSetting.datePipe) || '';
              return DailyDeposit
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
