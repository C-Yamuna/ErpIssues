import { Component } from '@angular/core';
import { CashCountertransactionconstant } from '../cash-counter-transaction-constant';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { MenuItem, SelectItem } from 'primeng/api';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { Branchtobranchtransaction } from './shared/branchtobranchtransaction.model';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { DatePipe } from '@angular/common';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { BranchToBranchTransactionService } from './shared/branch-to-branch-transaction.service';

@Component({
  selector: 'app-branch-to-branch-transation',
  templateUrl: './branch-to-branch-transation.component.html',
  styleUrls: ['./branch-to-branch-transation.component.css']
})
export class BranchToBranchTransationComponent {
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
  branchtobranchtransactionModel: Branchtobranchtransaction = new Branchtobranchtransaction();
  orgnizationSetting: any;
  constructor(private router: Router,private translate: TranslateService,private commonFunctionsService: CommonFunctionsService,private datePipe: DatePipe,
    private encryptDecryptService: EncryptDecryptService, private branchtobranchtransactionService: BranchToBranchTransactionService,private commonComponent: CommonComponent
   )
  {
    this.columns = [
      { field: 'pacsId', header: 'CASH_COUNTER_TRANSACTIONS.PACS' },
      { field: 'formBranchId', header: 'CASH_COUNTER_TRANSACTIONS.FROM_BRANCH' },
      { field: 'toBranchId', header: 'CASH_COUNTER_TRANSACTIONS.TO_BRANCH' },
      { field: 'date', header: 'CASH_COUNTER_TRANSACTIONS.TRANSACTION_DATE' },
      { field: 'transactionType', header: 'CASH_COUNTER_TRANSACTIONS.TRANSACTION_TYPE' },
      { field: '',header:'CASH_COUNTER_TRANSACTIONS.TRANSACTION_MODE'},
      { field: 'transactionAmount',header:'CASH_COUNTER_TRANSACTIONS.AMOUNT'},
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
maketransaction(){
  this.router.navigate([CashCountertransactionconstant.ADD_BRANCH_TO_BRANCH_TRANSACTION]);
}
viewData(rowData: any){
  this.router.navigate([CashCountertransactionconstant.VIEW_BRANCH_TO_BRANCH_TRANSACTION],  { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
}
editbranchtobranchtransaction(rowData: any) {
  this.router.navigate([CashCountertransactionconstant.ADD_BRANCH_TO_BRANCH_TRANSACTION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
}


getAll() {
  this.branchtobranchtransactionService.getAllBranchToBranchTransaction().subscribe((data: any) => {
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
