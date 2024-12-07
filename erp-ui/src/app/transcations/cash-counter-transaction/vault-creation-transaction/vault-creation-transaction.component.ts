import { Component } from '@angular/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CashCountertransactionconstant } from '../cash-counter-transaction-constant';
import { MenuItem, SelectItem } from 'primeng/api';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { TranslateService } from '@ngx-translate/core';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Router } from '@angular/router';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { Vaultcreation } from './shared/vaultcreation.model';
import { VaultCreationService } from './shared/vault-creation.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-vault-creation-transaction',
  templateUrl: './vault-creation-transaction.component.html',
  styleUrls: ['./vault-creation-transaction.component.css']
})
export class VaultCreationTransactionComponent {
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
  pacsId : any;
  branchId : any;
  gridListLength: Number | undefined;
  showForm: boolean = false;
  vaultcreationModel: Vaultcreation = new Vaultcreation();
  orgnizationSetting: any;
  constructor(private router: Router,private translate: TranslateService,private commonFunctionsService: CommonFunctionsService, private datePipe: DatePipe,
    private encryptDecryptService: EncryptDecryptService, private vaultcreationService: VaultCreationService,private commonComponent: CommonComponent
   )
  {
    this.columns = [
      { field: 'pacsId', header: 'CASH_COUNTER_TRANSACTIONS.PACS' },
      { field: 'branch', header: 'CASH_COUNTER_TRANSACTIONS.BRANCH' },
      { field: 'vaultName', header: 'CASH_COUNTER_TRANSACTIONS.NAME' },
      { field: 'effectiveStartDate', header: 'CASH_COUNTER_TRANSACTIONS.EFFECTIVE_START_DATE' },
      { field: 'effectiveEndDate',header:'CASH_COUNTER_TRANSACTIONS.EFFECTIVE_END_DATE'},
      { field: 'status', header: 'CASH_COUNTER_TRANSACTIONS.STATUS' },
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
      'Today Closing Balance',     
      'Total Transaction Amount',
      'Total Bundles',
      'Total Sections',
      'Total Loose Cash Count',                
    ];
    this.items = tabLabels.map((label, index)=> ({ label: label, value: `${index + 1}` }));
    //  tabLabels = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
   this.pacsId = 5;
   this.branchId = 12;
   this.orgnizationSetting = this.commonComponent.orgnizationSettings();
  this.getAll();
}
addvaultcreation(){
  this.router.navigate([CashCountertransactionconstant.ADD_VAULT_CREATION]);
}
viewData(rowData: any){
  this.router.navigate([CashCountertransactionconstant.VIEW_VAULT_CREATION],  { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
}
editvaultcreation(rowData: any) {
  this.router.navigate([CashCountertransactionconstant.ADD_VAULT_CREATION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
}


getAll() {
  this.vaultcreationService.getAllVaultCreation().subscribe((data: any) => {
    this.responseModel = data;
    if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
      this.gridListData = this.responseModel.data.map((obj: { effectiveStartDate: string | number | Date | null; effectiveEndDate: string | number | Date | null; }) => {
      obj.effectiveStartDate=this.datePipe.transform(obj.effectiveStartDate, this.orgnizationSetting.datePipe);
      obj.effectiveEndDate=this.datePipe.transform(obj.effectiveEndDate, this.orgnizationSetting.datePipe);
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
