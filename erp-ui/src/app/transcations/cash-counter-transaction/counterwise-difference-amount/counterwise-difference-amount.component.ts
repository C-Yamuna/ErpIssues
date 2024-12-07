import { Component } from '@angular/core';
import { CashCountertransactionconstant } from '../cash-counter-transaction-constant';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { MenuItem, SelectItem } from 'primeng/api';
import { CounterwiseDifferenceAmount } from './shared/counterwise-difference-amount.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CounterwiseDifferenceAmountService } from './shared/counterwise-difference-amount.service';
import { DatePipe } from '@angular/common';
import { CommonComponent } from 'src/app/shared/common.component';

@Component({
  selector: 'app-counterwise-difference-amount',
  templateUrl: './counterwise-difference-amount.component.html',
  styleUrls: ['./counterwise-difference-amount.component.css']
})
export class CounterwiseDifferenceAmountComponent {
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
  counterwisedifferenceamountModel: CounterwiseDifferenceAmount = new CounterwiseDifferenceAmount();
  orgnizationSetting: any;
  constructor(private router: Router,private translate: TranslateService,private commonFunctionsService: CommonFunctionsService,private datePipe: DatePipe,
    private encryptDecryptService: EncryptDecryptService, private counterwiseDifferenceAmountService: CounterwiseDifferenceAmountService,private commonComponent: CommonComponent
   )
  {
    this.columns = [
      { field: 'counterName', header: 'CASH_COUNTER_TRANSACTIONS.COUNTER' },
      { field: 'date', header: 'CASH_COUNTER_TRANSACTIONS.DATE' },
      { field: 'denominationName', header: 'CASH_COUNTER_TRANSACTIONS.DENOMINATIONS' },
      { field: 'actualCount', header: 'CASH_COUNTER_TRANSACTIONS.ACTUAL_COUNT' },
      { field: 'differenceCount',header:'CASH_COUNTER_TRANSACTIONS.DIFFERENCE_COUNT'},
      { field: 'differenceAmount',header:'CASH_COUNTER_TRANSACTIONS.DIFFERENCE_AMOUNT'},
      { field: 'remarks',header:'CASH_COUNTER_TRANSACTIONS.REMARKS'},
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
  this.router.navigate([CashCountertransactionconstant.ADD_COUNTERWISE_DIFFERENCE_AMOUNT]);
}
viewData(rowData: any){
  this.router.navigate([CashCountertransactionconstant.VIEW_COUNTERWISE_DIFFERENCE_AMOUNT],  { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
}
editcounterwisedifferenceamount(rowData: any) {
  this.router.navigate([CashCountertransactionconstant.ADD_COUNTERWISE_DIFFERENCE_AMOUNT], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
}


getAll() {
  this.counterwiseDifferenceAmountService.getAllCounterwiseDifferenceAmount().subscribe((data: any) => {
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
