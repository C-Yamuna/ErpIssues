import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { TermBorrowingService } from './shared/term-borrowing.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { DatePipe } from '@angular/common';
import { CommonComponent } from 'src/app/shared/common.component';
import { BorrowingTransactionConstant } from '../borrowing-transaction-constants';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { TermBorrowing } from './shared/term-borrowing.model';
import { CommonStatusData } from '../../common-status-data.json';

@Component({
  selector: 'app-term-borrowing',
  templateUrl: './term-borrowing.component.html',
  styleUrls: ['./term-borrowing.component.css']
})
export class TermBorrowingComponent {
  termBorrowingModel :TermBorrowing = new TermBorrowing();
  termborrowings: any[] = [];
  statuses!: SelectItem[];
  operations:any;
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
  operationslist: any [] = [];
  editViewButton:boolean=false;
  showForm: boolean=false;
  constructor(private router: Router,private translate: TranslateService,private commonFunctionsService: CommonFunctionsService
    ,private termBorrowingService : TermBorrowingService , private encryptDecryptService: EncryptDecryptService,private datePipe: DatePipe,
    private commonComponent: CommonComponent)
  {
    
    this. operationslist = [
      { label: "Disbursement", value: 1},
      { label: "Collection", value: 2 },
      { label: "Closure ", value: 3},
      { label: "Charges Collection ", value: 4 },
    
    ]
    this.termborrowings = [
      { field: 'accountNumber', header: 'BORROWINGSTRANSACTIONS.DCCB_BORROWING_ACCOUNT_NO' },
      { field: 'financiarBankTypeName', header: 'BORROWINGSTRANSACTIONS.FINANCIAL_BANK_TYPE' },
      { field: 'productName', header: 'BORROWINGSTRANSACTIONS.PRODUCT' },
      { field: 'applicationDate', header: 'BORROWINGSTRANSACTIONS.APPLICATION_DATE' },
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
  
   this.pacsId = 1;
   this.branchId = 1;
   this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.getAllBorrowingsAccountDetailsListByPacsIdAndBranchId();
  //  this.getAllBorrowings();
}
newBorrrowing(){
  this.router.navigate([BorrowingTransactionConstant.TERM_ACCOUNT_DETAILS]);
}
view(rowData: any) {
  this.router.navigate([BorrowingTransactionConstant.TERM_VIEW_BORROWING], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id),editbtn:this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE)}});
}
editborrowing(rowData: any) {
  this.router.navigate([BorrowingTransactionConstant.TERM_VIEW_BORROWING], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) ,isGridPage:this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE) }});
  this.editViewButton =true;
}

 /**
   * @author vinitha
   * @implements get grid data by pacsId and BranchId
   */
getAllBorrowingsAccountDetailsListByPacsIdAndBranchId() {
  this.commonComponent.startSpinner();
 this.orgnizationSetting = this.commonComponent.orgnizationSettings();
 this.termBorrowingService.getTermBorrowingAccountsListByPacsIdAndBranchId(this.pacsId,this.branchId).subscribe((data: any) => {
   this.responseModel = data;

   if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
    if (this.responseModel != null&& this.responseModel.data!= undefined) {
     this.gridListData = this.responseModel.data;
   }
     this.gridListData = this.gridListData.map(borrowing => {
      borrowing.sanctionedDate = this.datePipe.transform(borrowing.sanctionedDate, this.orgnizationSetting.datePipe) || '';
      borrowing.applicationDate = this.datePipe.transform(borrowing.applicationDate, this.orgnizationSetting.datePipe) || '';
    
       return borrowing
    
     });
   }
    this.commonComponent.stopSpinner();
 }, error => {
   this.msgs = [];
   this.msgs = [{ severity: "error", summary: 'Failed', detail:  applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
   this.commonComponent.stopSpinner();
 });
}
  onChange(){
    this.showForm = !this.showForm;
  }
}
