import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CashCountertransactionconstant } from './cash-counter-transaction-constant';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CashCounterService } from './shared/cash-counter.service';
import { Cashcounter } from './shared/cashcounter.model';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cash-counter-transaction',
  templateUrl: './cash-counter-transaction.component.html',
  styleUrls: ['./cash-counter-transaction.component.css']
})
export class CashCounterTransactionComponent {
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
  cashcounterModel: Cashcounter = new Cashcounter();
  orgnizationSetting: any;
  showForm: boolean = false;

  constructor(private router: Router,private translate: TranslateService,private commonFunctionsService: CommonFunctionsService,private datePipe: DatePipe,
    private encryptDecryptService: EncryptDecryptService, private cashcounterService: CashCounterService,private commonComponent: CommonComponent
   )
  {
    this.columns = [
      { field: 'pacsId', header: 'CASH_COUNTER_TRANSACTIONS.PACS' },
      { field: 'branch', header: 'CASH_COUNTER_TRANSACTIONS.BRANCH' },
      { field: 'counterName', header: 'CASH_COUNTER_TRANSACTIONS.NAME' },
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
      'No of PACS',
      'No of Branches',
      'No of Counters',
      'No of Users',                
    ];
    this.items = tabLabels.map((label, index)=> ({ label: label, value: `${index + 1}` }));
    //  tabLabels = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
   this.pacsId = 5;
   this.branchId = 12;
   this.orgnizationSetting = this.commonComponent.orgnizationSettings();
  this.getAll();
}
addcashcounter(){
  this.router.navigate([CashCountertransactionconstant.ADD_CASH_COUNTER]);
}
viewData(rowData: any){
  this.router.navigate([CashCountertransactionconstant.View_CASH_COUNTER],  { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
}
editcashcounter(rowData: any) {
  this.router.navigate([CashCountertransactionconstant.ADD_CASH_COUNTER], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
}


getAll() {
  this.cashcounterService.getAllashCounter().subscribe((data: any) => {
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
