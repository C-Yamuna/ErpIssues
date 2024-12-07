import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { BorrowingTransactionConstant } from './borrowing-transaction-constants';
import { MenuItem, SelectItem } from 'primeng/api';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { Router } from '@angular/router';
import { BorrowingsService } from './shared/borrowings.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { DatePipe } from '@angular/common';
import { CommonComponent } from 'src/app/shared/common.component';

@Component({
  selector: 'app-borrowing-transaction',
  templateUrl: './borrowing-transaction.component.html',
  styleUrls: ['./borrowing-transaction.component.css']
})
export class BorrowingTransactionComponent {
  borrowings: any[] = [];
  statuses!: SelectItem[];
  operations:any;
  operationslist:any;
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  value: number = 0;
  responseModel!: Responsemodel;
  gridListData: any[] = [];
  orgnizationSetting: any;
  msgs: any[] = [];
  tempGridListData: any[] = [];
  gridListLenght: Number | undefined;
  pacsId : any;
  branchId : any;
  gridList: any [] = [];

  constructor(private router: Router,private translate: TranslateService,private commonFunctionsService: CommonFunctionsService
    ,private borrowingsService : BorrowingsService , private encryptDecryptService: EncryptDecryptService,private datePipe: DatePipe,
    private commonComponent: CommonComponent)
  {
    this. operationslist = [
      { label: "EMI Chart", value: 1 },
      { label: "Disbursement", value: 2 },
      { label: "Collection", value: 3 },
      { label: "Closure ", value: 4},
      { label: "Charges Collection ", value: 5 },
    
    ]
    this.borrowings = [
      { field: 'accountNumber', header: 'BORROWINGSTRANSACTIONS.DCCB_BORROWING_ACCOUNT_NO' },
      { field: 'financiarBankType', header: 'BORROWINGSTRANSACTIONS.FINANCIAL_BANK_TYPE' },
      { field: 'productName', header: 'BORROWINGSTRANSACTIONS.PRODUCT' },
      { field: '', header: 'BORROWINGSTRANSACTIONS.OPENING_DATE' },
      { field: '',header:'BORROWINGSTRANSACTIONS.PURPOSE'},
      { field: 'sanctionedAmount',header:'BORROWINGSTRANSACTIONS.SANCTIONED_AMOUNT'},
      { field: 'sanctionedDate',header:'BORROWINGSTRANSACTIONS.SANCTIONED_DATE'},
      { field: 'roi', header: 'BORROWINGSTRANSACTIONS.ROI' },
      { field: 'statusName', header: 'BORROWINGSTRANSACTIONS.STATUS' },
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
      'Text',
      'Text',     
      'Text',
      'Text',
      'Text',
      'Text',                
    ];
    this.items = tabLabels.map((label, index)=> ({ label: label, value: `${index + 1}` }));
    //  tabLabels = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  //  this.getAllSbTransactionDetails(); 
   this.pacsId = 5;
   this.branchId = 12;
   this.orgnizationSetting = this.commonComponent.orgnizationSettings();
   this.getAllBorrowingsAccountDetailsListByPacsIdAndBranchId();
   this.getAllBorrowings();
}
newBorrrowing(){
  // this.router.navigate([BorrowingTransactionConstant.ACCOUNT_DETAILS]);
}
view(rowData : any){
  this.router.navigate([BorrowingTransactionConstant.VIEW_BORROWINGS], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
}
navigateToInfoDetails(event: any) {
  if (event.value === 1)
  this.router.navigate([BorrowingTransactionConstant.EMI_CHART]);
  else if (event.value === 2)
  this.router.navigate([BorrowingTransactionConstant.DISBURSEMENT]);
  else if (event.value === 3)
  this.router.navigate([BorrowingTransactionConstant.COLLECTION]);
  else if (event.value === 4)
  this.router.navigate([BorrowingTransactionConstant.CLOSURE]);

  else if (event.value === 5)
  this.router.navigate([BorrowingTransactionConstant.CHARGES_COLLECTION]);

 
}

// getAllBorrowings() {
//     this.borrowingsService.getAllBorrowings().subscribe((data: any) => {
//       this.responseModel = data;
//       this.gridListData = this.responseModel.data;
//       this.gridListLenght = this.gridListData.length;
//       this.gridListData = this.gridListData.map(borrowing => {
//         borrowing.sanctionedDate = this.datePipe.transform(borrowing.sanctionedDate, this.orgnizationSetting.datePipe)||'';
       
//         return borrowing
//       });
//       this.tempGridListData = this.gridListData;
//       //  this.commonComponent.stopSpinner();
//     }, error => {
//       this.msgs = [];
//       this.msgs = [{ severity: "error", summary: 'Failed', detail:  applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
//       // this.commonComponent.stopSpinner();
//     });
//   }
getAllBorrowings() {
    this.borrowingsService.getAllBorrowings().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.gridListData = this.responseModel.data.map((obj: { sanctionedDate: string | number | Date | null;  }) => {
        obj.sanctionedDate=this.datePipe.transform(obj.sanctionedDate, this.orgnizationSetting.datePipe);
      
        return obj;
        })
      } else {
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    });
  }
  getAllBorrowingsAccountDetailsListByPacsIdAndBranchId() {
    //  this.commonComponent.startSpinner();
    // this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.borrowingsService.getBorrowingAccountsListByPacsIdAndBranchId(this.pacsId , this.branchId).subscribe((data: any) => {
      this.responseModel = data;
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.gridListData = this.responseModel.data.map((obj: { sanctionedDate: string | number | Date | null; }) => {
        obj.sanctionedDate=this.datePipe.transform(obj.sanctionedDate, this.orgnizationSetting.datePipe);
      
        return obj;
        })
      } else {
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    });
  }
}
