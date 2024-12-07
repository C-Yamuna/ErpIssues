import { Component } from '@angular/core';
import { CashCountertransactionconstant } from '../cash-counter-transaction-constant';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { MenuItem, SelectItem } from 'primeng/api';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { VaultCash } from './shared/vault-cash.model';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { DatePipe } from '@angular/common';
import { VaultCashService } from './shared/vault-cash.service';

@Component({
  selector: 'app-vault-cash',
  templateUrl: './vault-cash.component.html',
  styleUrls: ['./vault-cash.component.css']
})
export class VaultCashComponent {
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
  vaultcashModel: VaultCash = new VaultCash();
  orgnizationSetting: any;
  constructor(private router: Router,private translate: TranslateService,private commonFunctionsService: CommonFunctionsService,private datePipe: DatePipe,
    private encryptDecryptService: EncryptDecryptService, private vaultCashService: VaultCashService,private commonComponent: CommonComponent
   )
  {
    this.columns = [
      { field: 'date', header: 'CASH_COUNTER_TRANSACTIONS.DATE' },
      { field: 'vaultName', header: 'CASH_COUNTER_TRANSACTIONS.VAULT' },
      { field: 'vaultOpeningBalance', header: 'CASH_COUNTER_TRANSACTIONS.OPENING_BALANCE' },
      { field: 'vaultAmount', header: 'CASH_COUNTER_TRANSACTIONS.AMOUNT' },
      { field: 'vaultClosingBalance',header:'CASH_COUNTER_TRANSACTIONS.CLOSING_BALANCE'},
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
      'Available Vault Cash',
      'Today Opening Balance',     
      'Total Bundles',
      'Total Sections',
      'Total Loose Cash Count',   
      'Total Coins Count'          
    ];
    this.items = tabLabels.map((label, index)=> ({ label: label, value: `${index + 1}` }));
    //  tabLabels = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  
   this.orgnizationSetting = this.commonComponent.orgnizationSettings();
  this.getAll();
}

viewData(rowData: any){
  this.router.navigate([CashCountertransactionconstant.VIEW_VAULT_CASH],  { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
}


getAll() {
  this.vaultCashService.getAllVaultCash().subscribe((data: any) => {
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
