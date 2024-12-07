import { Component } from '@angular/core';
import { CashCountertransactionconstant } from '../cash-counter-transaction-constant';
import { VaultToDccbTransaction } from './shared/vault-to-dccb-transaction.model';
import { MenuItem, SelectItem } from 'primeng/api';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { VaultToDccbTransactionService } from './shared/vault-to-dccb-transaction.service';
import { DatePipe } from '@angular/common';
import { CommonComponent } from 'src/app/shared/common.component';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-vault-to-dccb-transaction',
  templateUrl: './vault-to-dccb-transaction.component.html',
  styleUrls: ['./vault-to-dccb-transaction.component.css']
})
export class VaultToDccbTransactionComponent {
  columns: any[] = [];
  statuses!: SelectItem[];
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  responseModel!: Responsemodel;
  gridListData: any[] = [];
  value: number = 0;
  msgs: any[] = [];
  tempGridListData: any[] = [];
  gridListLenght: Number | undefined;
  showForm: boolean = false;
  pacsId : any;
  branchId : any;
  gridListLength: Number | undefined;
  vaulttodccbtransactionModel: VaultToDccbTransaction = new VaultToDccbTransaction();
  orgnizationSetting: any;
  constructor(private router: Router,private translate: TranslateService,private commonFunctionsService: CommonFunctionsService,private datePipe: DatePipe,
    private encryptDecryptService: EncryptDecryptService, private vaultToDccbTransactionService: VaultToDccbTransactionService,private commonComponent: CommonComponent
   )
  {
    this.columns = [
      { field: 'dccbAccountNumber', header: 'CASH_COUNTER_TRANSACTIONS.DCCB_ACCOUNT_NO' },
      { field: 'transactionType', header: 'CASH_COUNTER_TRANSACTIONS.TRANSACTION_TYPE' },
      { field: '', header: 'CASH_COUNTER_TRANSACTIONS.TRANSACTION_MODE' },
      { field: 'transactionAmount', header: 'CASH_COUNTER_TRANSACTIONS.TRANSACTION_AMOUNT' },
      { field: 'date',header:'CASH_COUNTER_TRANSACTIONS.DATE'},
      { field: 'adviceCopyPath',header:'CASH_COUNTER_TRANSACTIONS.FILE'},
      { field: 'statusName', header: 'CASH_COUNTER_TRANSACTIONS.STATUS' },
    ];
   }
  ngOnInit() {
    this.commonFunctionsService.setStorageValue('language', 'en');
    this.commonFunctionsService.data.subscribe((res: any) => {
      if (res) {
        this.translate.use(res);
      } else {
        this.translate.use('en');
      }
    });
    let tabLabels = [
      'Yesterday Closing Balance',
      'Today Opening Balance',     
      'Total Transaction Amount',
      'Total Bundles',
      'Total Sections',
      'Total Loose Cash Count',             
    ];
    this.items = tabLabels.map((label, index)=> ({ label: label, value: `${index + 1}` }));
    //  tabLabels = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  
   this.orgnizationSetting = this.commonComponent.orgnizationSettings();
  this.getAll();
}
adddata(){
  this.router.navigate([CashCountertransactionconstant.ADD_VAULT_TO_DCCB_TRANSACTION]);
}
viewData(rowData: any){
  this.router.navigate([CashCountertransactionconstant.VIEW_VAULT_TO_DCCB_TRANSACTION],  { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
}
editvaulttodccb(rowData: any) {
  this.router.navigate([CashCountertransactionconstant.ADD_VAULT_TO_DCCB_TRANSACTION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
}


getAll() {
  this.vaultToDccbTransactionService.getAllVaultToDccbTransaction().subscribe((data: any) => {
    this.responseModel = data;
    if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
      this.gridListData = this.responseModel.data.map((obj: { date: string | number | Date | null;  }) => {
      obj.date=this.datePipe.transform(obj.date, this.orgnizationSetting.datePipe);
     
      return obj;
      })
    } else {
      this.msgs = [];
      this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
    }
  });
}
onChange() {
  this.showForm = !this.showForm;
}
}
