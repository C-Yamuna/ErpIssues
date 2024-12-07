import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { Loantransactionconstant } from '../loan-transaction-constant';
import { SaoLoanApplicationService } from '../shared/sao-loans/sao-loan-application.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';

@Component({
  selector: 'app-sao',
  templateUrl: './sao.component.html',
  styleUrls: ['./sao.component.css']
})
export class SAOComponent {
  loans: any[] = [];
  statuses!: SelectItem[];
  operations:any;
  operationslist:any;
  //loanslist:any;
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  value: number = 0;
  newdepositer:any;
  responseModel!: Responsemodel;
  msgs: any[] = [];
  tempGridListData: any[] = [];
  gridListLenght: Number | undefined;
  gridListData: any[] = [];
  pacsId : any;
  branchId : any;
  gridList: any [] = [];
  showForm: boolean=false;
  activeStatusCount: number = 0;
  inactiveStatusCount: number = 0;

  constructor(private router: Router, private translate: TranslateService,private commonComponent: CommonComponent,
    private commonFunctionsService: CommonFunctionsService,private saoLoanApplicationService : SaoLoanApplicationService, private encryptDecryptService: EncryptDecryptService)
  { 
    this.loans = [
      { field: 'admissionNo',header:'ERP.ADMISSION_NO'},
      // { field: 'memberName', header: 'NAME' },
      { field: 'accountNumber', header: 'ERP.LOAN_ACCOUNT_NUMBER' },
      // { field: 'Application ', header: 'APPLICATION' },
      { field: 'saoProductName', header: 'ERP.PRODUCT'},
      { field: 'sanctionAmount',header:'ERP.SANCTION_AMOUNT'},
      { field: 'effectiveRoi', header: 'ERP.ROI' },
      { field: 'accountStatusName', header: 'ERP.STATUS' },
     // { field: 'Action', header: 'ACTION' },
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
  
    this. operationslist = [
      { label: "Disbursement", value: 1 },
      { label: "Collection", value: 2 },
      { label: "Closure", value: 3 },
    
    ]
 
  let tabLabels = [
    'Total Accounts',
    'Total Disbursement Amount',     
    'Total Collection Amount',
    'Total SAO Loans',
    'Total Term Loans',
    ' Total Simple Interest Loans ',                   
                                 
];
 this.items = tabLabels.map((label, index)=> ({ label: label, value: `${index + 1}` }));
//  tabLabels = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
//this.getAllSaoLoanApplication();
  this.pacsId = 1;
   this.branchId = 1;
   this.getAllSaoLoanApplicationDetailsListByPacsIdAndBranchId();
}

getAllSaoLoanApplication() {
  this.commonComponent.startSpinner();
  this.saoLoanApplicationService.getAllSaoLoanApplication().subscribe((data: any) => {
  this.responseModel = data;
  this.gridListData = this.responseModel.data;
  this.gridListLenght = this.gridListData.length;
  
  this.tempGridListData = this.gridListData;
  this.commonComponent.stopSpinner();
}, error => {
  this.msgs = [];
  this.msgs = [{ severity: "error", summary: 'Failed', detail:  applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
  this.commonComponent.stopSpinner();
});
}
getAllSaoLoanApplicationDetailsListByPacsIdAndBranchId() {
   this.commonComponent.startSpinner();
    this.saoLoanApplicationService.getSaoLoanApplicationDetailsByPacsIdAndBranchId(this.pacsId , this.branchId).subscribe((data: any) => {
    this.responseModel = data;
    this.gridList = this.responseModel.data;
    this.gridListLenght = this.gridList.length;
    
    this.tempGridListData = this.gridList;
      this.commonComponent.stopSpinner();
  }, error => {
    this.msgs = [];
    this.msgs = [{ severity: "error", summary: 'Failed', detail:  applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
     this.commonComponent.stopSpinner();
  });
}

navigateToOperations(event: any,rowData : any) {
  if (event.value === 1)
  this.router.navigate([Loantransactionconstant.SAO_LOAN_DISBURSMENT],{ queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  else if (event.value === 2)
  this.router.navigate([Loantransactionconstant.SAO_LOAN_COLLECTIONS],{ queryParams: { id: this.encryptDecryptService.encrypt(rowData.id), accountNumber: this.encryptDecryptService.encrypt(rowData.accountNumber)} });
  else if (event.value === 3)
  this.router.navigate([Loantransactionconstant.SAO_CLOSURE],{ queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });

}


view(rowData : any){
  this.router.navigate([Loantransactionconstant.VIEW_SAO_LOANS], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id),editOpt: this.encryptDecryptService.encrypt(0),isGridPage:this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE) } });
}
edit(rowdata:any){
  this.router.navigate([Loantransactionconstant.VIEW_SAO_LOANS],{ queryParams: { id: this.encryptDecryptService.encrypt(rowdata.id) , editOpt: this.encryptDecryptService.encrypt(1),isGridPage:this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE) }});
}
createaccount(){
  this.commonFunctionsService.setStorageValue(applicationConstants.INDIVIDUAL_MEMBER_DTAILS , null);
  this.commonFunctionsService.setStorageValue(applicationConstants.GROUP_DETAILS , null);
  this.commonFunctionsService.setStorageValue(applicationConstants.INSTITUTION_DETAILS , null);  
  this.router.navigate([Loantransactionconstant.MEMBERSHIP_BASIC_DETAILS]);
}

onChange(){
  this.showForm = !this.showForm;
}

}
