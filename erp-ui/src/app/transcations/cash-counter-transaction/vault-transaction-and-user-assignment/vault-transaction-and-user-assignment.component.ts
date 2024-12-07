import { Component } from '@angular/core';
import { CashCountertransactionconstant } from '../cash-counter-transaction-constant';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { DatePipe } from '@angular/common';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { MenuItem, SelectItem } from 'primeng/api';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { VaultVaultTransactionAndUserAssignment } from './shared/vault-vault-transaction-and-user-assignment.model';
import { VaultTransactionAndUserAssignmentService } from './shared/vault-transaction-and-user-assignment.service';

@Component({
  selector: 'app-vault-transaction-and-user-assignment',
  templateUrl: './vault-transaction-and-user-assignment.component.html',
  styleUrls: ['./vault-transaction-and-user-assignment.component.css']
})
export class VaultTransactionAndUserAssignmentComponent {
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
  vaulttransactionanduserassignmentModel: VaultVaultTransactionAndUserAssignment = new VaultVaultTransactionAndUserAssignment();
  orgnizationSetting: any;

  constructor(private router: Router,private translate: TranslateService,private commonFunctionsService: CommonFunctionsService,private datePipe: DatePipe,
    private encryptDecryptService: EncryptDecryptService, private vaulttransactionService: VaultTransactionAndUserAssignmentService,private commonComponent: CommonComponent
   )
  {
    this.columns = [
      { field: 'counterName', header: 'CASH_COUNTER_TRANSACTIONS.CASH_COUNTER_NAME' },
      { field: 'vaultName', header: 'CASH_COUNTER_TRANSACTIONS.USER' },
      { field: 'date', header: 'CASH_COUNTER_TRANSACTIONS.DATE' },
      { field: '', header: 'CASH_COUNTER_TRANSACTIONS.OPENING_BALANCE' },
      { field: 'transactionType',header:'CASH_COUNTER_TRANSACTIONS.TRANSACTION_TYPE'},
      { field: 'transactionAmount',header:'CASH_COUNTER_TRANSACTIONS.TRANSACTION_AMOUNT'},
      { field: '',header:'CASH_COUNTER_TRANSACTIONS.DIFFERENCE_AMOUNT'},
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

addcashcounter(){
  this.router.navigate([CashCountertransactionconstant.ADD_VAULT_TRANSACTION_AND_USER_ASSIGNMENT]);
}
viewData(rowData: any){
  this.router.navigate([CashCountertransactionconstant.VIEW_VAULT_TRANSACTION_AND_USER_ASSIGNMENT],  { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
}
editcashcounter(rowData: any) {
  this.router.navigate([CashCountertransactionconstant.ADD_VAULT_TRANSACTION_AND_USER_ASSIGNMENT], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
}
getAll() {
  this.vaulttransactionService.getAllVaultTransactionAndUserAssignment().subscribe((data: any) => {
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
