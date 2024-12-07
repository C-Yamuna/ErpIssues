import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { FdNonCummulativeAccountsService } from '../shared/fd-non-cummulative-accounts.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { RdAccountsService } from '../shared/rd-accounts.service';
import { termdeposittransactionconstant } from '../term-deposit-transaction-constant';

@Component({
  selector: 'app-recurring-deposit',
  templateUrl: './recurring-deposit.component.html',
  styleUrls: ['./recurring-deposit.component.css']
})
export class RecurringDepositComponent {

  termdeposits: any[] = [];
  statuses!: SelectItem[];
  operations: any;
  operationslist: any;
  termdepositlist: any;
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  value: number = 0;
  newdepositer: any;
  pacsId: any;
  branchId: any;
  responseModel!: Responsemodel;
  gridListData: any[] = [];
  msgs: any[] = [];
  orgnizationSetting: any;
  showForm: boolean=false;

  constructor(private router: Router, private translate: TranslateService,
    private commonComponent: CommonComponent, private encryptDecryptService:
      EncryptDecryptService, private commonFunctionsService: CommonFunctionsService,
    private rdAccountsService: RdAccountsService) { }

  ngOnInit() {
    this.pacsId = 5;
    this.branchId = 12;
    this.commonFunctionsService.setStorageValue('language', 'en');
    this.commonFunctionsService.data.subscribe((res: any) => {
      if (res) {
        this.translate.use(res);
      } else {
        this.translate.use('en');
      }
    });

    this.operationslist = [
      { label: "Interest Payment", value: 1 },
      { label: "Foreclosure", value: 2 },
      { label: "Closure", value: 3 },
      { label: "Renewal", value: 4 },

    ]
    this.termdeposits = [
      { field: 'accountNumber', header: 'TERMDEPOSITSTRANSACTION.ACCOUNT_NUMBER' },
      { field: 'adminssionNumber', header: 'TERMDEPOSITSTRANSACTION.ADMINSSION_NUMBER' },
      { field: 'accountTypeName', header: 'TERMDEPOSITSTRANSACTION.ACCOUNT_TYPE' },
      { field: 'memberTypeName', header: 'TERMDEPOSITSTRANSACTION.MEMBER_TYPE' },
      { field: 'productName', header: 'TERMDEPOSITSTRANSACTION.PRODUCT_NAME' },
      { field: 'roi', header: 'TERMDEPOSITSTRANSACTION.ROI' },
      { field: 'statusName', header: 'TERMDEPOSITSTRANSACTION.STATUS' },
    ];

    let tabLabels = [
      'Total Accounts',
      'Total Deposit Amount',
      'Total Maturity Amount',
      'Cumulative Accounts',
      'Non-Cumulative Accounts',
      'Recurring Deposit Accounts',
      'Total Deposit Amount',
      'Forclosure Accounts',
      'Closure Accounts',
    ];
    this.items = tabLabels.map((label, index) => ({ label: label, value: `${index + 1}` }));
    //  tabLabels = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
    this.pacsId = 1;
    this.branchId = 1;
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.getGridListData();
  }


  navigateToOperations(event: any) {
  //   if (event.value === 1)
  // this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_INTEREST_PAYMENT]);
  // else if (event.value === 2)
  // this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_FORE_CLOSURE]);
  // else if (event.value === 3)
  // this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_CLOSURE]);
  // else if (event.value === 4)
  // this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_RENEWAL]);
}

  getGridListData() {
    this.commonComponent.startSpinner();
    //  this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.rdAccountsService.getRdAccountsByPacsAndBranchId(this.pacsId, this.branchId).subscribe((data: any) => {
      this.responseModel = data;

      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.gridListData = this.responseModel.data;
        // this.gridListData = this.gridListData.map(membership => {
        //   return membership
        // });
      } else {
        this.msgs = [];
        this.msgs = [{ severity: "error", summary: 'Failed', detail: this.responseModel.statusMsg }];
        this.commonComponent.stopSpinner();
      }
      this.commonComponent.stopSpinner();
    }, error => {
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
      this.commonComponent.stopSpinner();
    });
  }

  addNewDeposit() {
    this.commonFunctionsService.setStorageValue(applicationConstants.B_CLASS_MEMBER_CREATION, false);
    this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_MEMBERSHIP_DETAILS]);
  }

  editRecurringDepositDetails(rowData: any){
    this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_PREVIEW], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id), editbutton: this.encryptDecryptService.encrypt(1) } });
  }

  viewRecurringDepositDetails(rowData: any) {
    this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_PREVIEW], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id), editbutton: this.encryptDecryptService.encrypt(1) } });
  }
  
  onChange(){
    this.showForm = !this.showForm;
  }
}
