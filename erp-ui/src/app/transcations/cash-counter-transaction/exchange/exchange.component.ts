import { Component } from '@angular/core';
import { Exchange } from './shared/exchange.model';
import { MenuItem, SelectItem } from 'primeng/api';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { DatePipe } from '@angular/common';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { ExchangeService } from './shared/exchange.service';
import { CashCountertransactionconstant } from '../cash-counter-transaction-constant';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent {
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
  exchangeModel: Exchange = new Exchange();
  orgnizationSetting: any;
  constructor(private router: Router,private translate: TranslateService,private commonFunctionsService: CommonFunctionsService,private datePipe: DatePipe,
    private encryptDecryptService: EncryptDecryptService, private exchangeService: ExchangeService,private commonComponent: CommonComponent
   )
  {
    this.columns = [
      { field: 'date', header: 'CASH_COUNTER_TRANSACTIONS.DATE' },
      { field: 'formCounterName', header: 'CASH_COUNTER_TRANSACTIONS.FROM' },
      { field: 'toCounterName', header: 'CASH_COUNTER_TRANSACTIONS.TO' },
      { field: 'amount', header: 'CASH_COUNTER_TRANSACTIONS.AMOUNT' },
      { field: '',header:'CASH_COUNTER_TRANSACTIONS.ADMISSION_NUMBER'},
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
  this.router.navigate([CashCountertransactionconstant.ADD_EXCHANGE]);
}
viewData(rowData: any){
  this.router.navigate([CashCountertransactionconstant.VIEW_EXCHANGE],  { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
}
editexchange(rowData: any) {
  this.router.navigate([CashCountertransactionconstant.ADD_EXCHANGE], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
}


getAll() {
  this.exchangeService.getAllExchange().subscribe((data: any) => {
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
