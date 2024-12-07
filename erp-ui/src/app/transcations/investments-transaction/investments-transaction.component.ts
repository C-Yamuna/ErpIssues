import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { InvestmentsTransactionConstant } from './investments-transaction-constants';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { InvestmentApplicationDetailsService } from './deposit-investments/investments-application-details/shared/investment-application-details.service';

@Component({
  selector: 'app-investments-transaction',
  templateUrl: './investments-transaction.component.html',
  styleUrls: ['./investments-transaction.component.css']
})
export class InvestmentsTransactionComponent implements OnInit {
  columns: any[] = [];
  statuses!: SelectItem[];
  items: MenuItem[] = [];
  activeItem: MenuItem | undefined;
  responseModel!: Responsemodel;
  gridListData: any[] = [];
  value: number = 0;
  msgs: any[] = [];
  tempGridListData: any[] = [];
  gridListLenght: Number | undefined;

  pacsId: any;
  branchId: any;
  gridListLength: Number | undefined;
  orgnizationSetting: any;
  activeStatusCount: number = 0;
  inactiveStatusCount: number = 0;
  operations: any;
  investmentOperationsList: any;
  investmentList: any;
  showForm: boolean = false;
  selectedInvestment: any;

  constructor(private router: Router,
    private translate: TranslateService,
    private commonFunctionsService: CommonFunctionsService,
    private datePipe: DatePipe,
    private encryptDecryptService: EncryptDecryptService,
    private commonComponent: CommonComponent,
    private investmentApplicationDetailsService: InvestmentApplicationDetailsService) {

    this.columns = [
      { field: 'accountNumber', header: 'INVESTMENTS_TRANSACTIONS.ACCOUNT_NUMBER' },
      { field: 'productName', header: 'INVESTMENTS_TRANSACTIONS.PRODUCT' },
      { field: 'bankName', header: 'INVESTMENTS_TRANSACTIONS.BANK_NAME' },
      { field: 'depositType', header: 'INVESTMENTS_TRANSACTIONS.DEPOSIT_TYPE' },
      { field: 'depositAmount', header: 'INVESTMENTS_TRANSACTIONS.DEPOSIT_AMOUNT' },
      { field: 'roi', header: 'INVESTMENTS_TRANSACTIONS.ROI' },
      { field: 'depositDate', header: 'INVESTMENTS_TRANSACTIONS.DEPOSIT_DATE' },
      { field: 'status', header: 'INVESTMENTS_TRANSACTIONS.STATUS' },
    ];

    this.investmentOperationsList = [
      { label: "Interest Payment", value: 1 },
      { label: "Foreclosure", value: 2 },
      { label: "Closure", value: 3 }
    ];

    this.investmentList = [
      { label: "Deposit", value: 1 },
      { label: "Shares", value: 2 }
    ]
  }
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.commonFunctionsService.setStorageValue('language', 'en');
    this.commonFunctionsService.data.subscribe((res: any) => {
      if (res) {
        this.translate.use(res);
      } else {
        this.translate.use('en');
      }
    });
    let tabLabels = [
      'Active Accounts',
      'InActive Accounts',
      'Dormant Accounts',
      'Balance (Of 90 Accounts)',
      'Today Deposit',
      'Today Withdraw',
    ];
    this.items = tabLabels.map((label, index) => ({ label: label, value: `${index + 1}` }));
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.pacsId = 1;
    this.branchId = 1;
    this.getAll();
  }

  navigateToInfoDetails(event: any, rowData: any) {

    if (event.value === 1)
      this.router.navigate([InvestmentsTransactionConstant.INVESTMENTS_INTEREST_PAYMENT], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });

    else if (event.value === 2)
      this.router.navigate([InvestmentsTransactionConstant.INVESTMENTS_FORECLOSURE], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });

    else if (event.value === 3)
      this.router.navigate([InvestmentsTransactionConstant.INVESTMENTS_CLOSURE], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  addNewInvestments(event: any) {
    if (event.value === 1)
      this.router.navigate([InvestmentsTransactionConstant.INVESTMENTS_APPLICATION_DETAILS]);

    else if (event.value === 2)
      this.router.navigate([InvestmentsTransactionConstant.SHARES_INVESTMENTS]);

  }

  //navigation to view screen
  viewNewInvestments(rowData: any) {
    if (rowData.depositType != null && rowData.depositType != undefined) {
      this.router.navigate([InvestmentsTransactionConstant.VIEW_INVESTMENTS_TRANSACTION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id), editbutton: this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE),isGridPage: this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE) } });
    } else {
      this.router.navigate([InvestmentsTransactionConstant.VIEW_SHARES_INVESTMENTS], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id), editbutton: this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE) ,isGridPage: this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE)} });
    }
  }
  //navigation to edit 
  editNewInvestments(rowData: any) {
    if (rowData.depositType != null && rowData.depositType != undefined) {
      this.router.navigate([InvestmentsTransactionConstant.VIEW_INVESTMENTS_TRANSACTION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id), editbutton: this.encryptDecryptService.encrypt(applicationConstants.ACTIVE),isGridPage: this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE) } });
    } else {
      this.router.navigate([InvestmentsTransactionConstant.VIEW_SHARES_INVESTMENTS], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id), editbutton: this.encryptDecryptService.encrypt(applicationConstants.ACTIVE) ,isGridPage: this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE)} });
    }
  }

  //getAll method for investments gird data
  getAll() {
    this.commonComponent.startSpinner();
    this.investmentApplicationDetailsService.getAllGrid(this.pacsId, this.branchId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.gridListData = this.responseModel.data;
        this.gridListData = this.responseModel.data.map((item: any) => {
          item.depositDate = this.datePipe.transform(item.depositDate,this.orgnizationSetting.datePipe);
          item.maturityDate = this.datePipe.transform(item.maturityDate,this.orgnizationSetting.datePipe);
          return item;
        });
        this.commonComponent.stopSpinner();
      } else {
        this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
    });
  }

  onChange() {
    this.showForm = !this.showForm;
  }
}
