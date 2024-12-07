import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup , FormBuilder} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { VaultTransactionAndUserAssignmentService } from '../vault-transaction-and-user-assignment/shared/vault-transaction-and-user-assignment.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';

@Component({
  selector: 'app-cashier-scroll',
  templateUrl: './cashier-scroll.component.html',
  styleUrls: ['./cashier-scroll.component.css']
})
export class CashierScrollComponent {
  dateformat:any;
  maxDate = new Date();
  gridListData: any[] = [];
  columns: any[] = [];
  subcolumns: any[] = [];
  amount:any[]=[];
  msgs: any[] = [];
  responseModel!: Responsemodel;
  cashierscrollform:FormGroup;
  pacsId : any;
  branchId : any;
  constructor(private datePipe: DatePipe,private formBuilder:FormBuilder,
    private translate: TranslateService,private commonFunctionsService: CommonFunctionsService,
    private vaulttransactionService: VaultTransactionAndUserAssignmentService,
    private commonComponent: CommonComponent
  ){
   this.cashierscrollform = this.formBuilder.group({

})
this.columns = [
  { field: '', header: 'CASH_COUNTER_TRANSACTIONS.RECEIPTS' },
  { field: '', header: 'CASH_COUNTER_TRANSACTIONS.PAYMENTS' },

];
this.subcolumns = [
  { field: '', header: 'CASH_COUNTER_TRANSACTIONS.S.NO' },
  { field: '', header: 'CASH_COUNTER_TRANSACTIONS.PARTICULARS' },
  { field: '', header: 'CASH_COUNTER_TRANSACTIONS.AMOUNTS' },

];
this.amount= [
  {field: '', header:'CASH_COUNTER_TRANSACTIONS.TOTAL_AMOUNT'}
]
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
    this.pacsId = 5;
    this.branchId = 12;
    this.dateformat = this.commonComponent.getTimeStamp();
    this.getAll(this.pacsId,this.branchId,this.dateformat);
}

getAll( pacsId:any , branchId:any, dateVal:any) {
  this.vaulttransactionService.getAllTransactionsForCashierScroll(pacsId,branchId,dateVal).subscribe((data: any) => {
    this.responseModel = data;
    if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
      this.gridListData = this.responseModel.data.map((obj: { date: string | number | Date | null;  }) => {
      obj.date=this.datePipe.transform(obj.date, this.dateformat.datePipe);
     
      return obj;
      })
    } else {
      this.msgs = [];
      this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
    }
  });
}

}
