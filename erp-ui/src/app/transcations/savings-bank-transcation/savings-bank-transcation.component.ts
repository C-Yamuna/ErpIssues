import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, SelectItem } from 'primeng/api';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { savingsbanktransactionconstant } from './savingsbank-transaction-constant';
import { SbTransactionDetailsService } from './shared/sb-transaction-details.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { SavingsAccountService } from './shared/savings-account.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { DatePipe } from '@angular/common';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { ERP_TRANSACTION_CONSTANTS } from '../erp-transaction-constants';

@Component({
  selector: 'app-savings-bank-transcation',
  templateUrl: './savings-bank-transcation.component.html',
  styleUrls: ['./savings-bank-transcation.component.css']
})
export class SavingsBankTranscationComponent {
  savingsbank: any[] = [];
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
  activeStatusCount: any;
  inactiveStatusCount: any;
  translate: any;
  showForm: boolean=false;
  memberPhotoCopyZoom: boolean = false;
  memberphotCopyMultipartFileList: any;

  constructor(private router: Router,private commonFunctionsService: CommonFunctionsService
    ,private savingsAccountService : SavingsAccountService , private encryptDecryptService: EncryptDecryptService ,private commonComponent: CommonComponent,private datePipe : DatePipe ,private fileUploadService : FileUploadService)
  {
    this. operationslist = [
      { label: "Standing instructions", value: 1 },
      { label: "Account service", value: 2 },
      { label: "Amount Block", value: 3 },
      // { label: "Chequebook issue", value: 4 },
      // { label: "Debit card issue ", value: 5 },
      { label: "Closure ", value: 6 },
      { label: "Death Claim ", value: 7 },
    ]
    this.savingsbank = [
      { field: 'accountNumber', header: 'Account Number' },
      { field: 'balance', header: 'Account Balence' },
      { field: 'name', header: 'Name' },
      { field: 'memberTypeName', header: 'Member Type' },
      { field: 'accountTypeName', header: 'Account Type' },
      { field: 'admissionNumber',header:'Admission Number'},
      { field: 'accountOpenDate', header: 'Account Openinig Date' },
      { field: 'accountStatusName', header: 'Status' },
      // { field: 'Action', header: 'ACTION' },
    ];
   }
  ngOnInit() {
    this.commonFunctionsService.setStorageValue('language', 'en');
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    // this.commonFunctionsService.data.subscribe((res: any) => {
    //   if (res) {
    //     this.translate.use(res);
    //   } else {
    //     this.translate.use('en');
    //   }
    // });
    let tabLabels = [
      'Active Accounts',
      'Inactive Accounts',     
      'Dormat Accounts',
      'Balance(Of 90 Accounts)',
      'Today Deposit',
      'Today Withdraw',                
    ];
    this.items = tabLabels.map((label, index)=> ({ label: label, value: `${index + 1}`  }));
    //  tabLabels = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  //  this.getAllSbTransactionDetails(); 
   this.pacsId = 5;
   this.branchId = 12;
   this.getAllSbAccountDetailsListByPacsIdAndBranchId();
}
createaccount(){
  this.commonFunctionsService.setStorageValue(applicationConstants.B_CLASS_MEMBER_CREATION, false);
  this.router.navigate([savingsbanktransactionconstant.MEMBERSHIP_BASIC_DETAILS] ,{ queryParams: { falg: this.encryptDecryptService.encrypt(true)}});
}
transaction(rowData : any){
  this.router.navigate([savingsbanktransactionconstant.SB_TRANSACTIONS], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id)}});
}
view(rowData : any){
  this.router.navigate([savingsbanktransactionconstant.VIEW_TRANSACTIONS], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) ,editOpt: this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE),isGridPage: this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE)}});
}
navigateToInfoDetails(event: any , rowData :any) {
  if (event.value === 1)
  this.router.navigate([savingsbanktransactionconstant.SB_STANDING_INSTRUCTIONS], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id)}});
  else if (event.value === 2)
  this.router.navigate([savingsbanktransactionconstant.SB_ACCOUNT_SERVICE], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id)}});
  else if (event.value === 3)
  this.router.navigate([savingsbanktransactionconstant.SB_AMOUNT_BLOCK], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id)}});
  else if (event.value === 4)
  this.router.navigate([savingsbanktransactionconstant.SB_CHEQUEBOOK_ISSUE], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id)}});

  else if (event.value === 5)
  this.router.navigate([savingsbanktransactionconstant.SB_DEBITCARD_ISSUE], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id)}});

  else if (event.value === 6)
  this.router.navigate([savingsbanktransactionconstant.SB_CLOSURE], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id)}});

  else if (event.value === 7)
  this.router.navigate([savingsbanktransactionconstant.SB_DEATH_CLAIM], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id)}});

}

getAllSbTransactionDetails() {
    this.savingsAccountService.getAllSavingsAccountDetails().subscribe((data: any) => {
      this.responseModel = data;
      this.gridListData = this.responseModel.data;
      if(this.gridListData.length > 0 && this.gridListData != null && this.gridListData != undefined){
        this.gridListLenght = this.gridListData.length;
        this.gridListData = this.gridListData.map(sb => {
          if(sb != null && sb != undefined){
          if( sb.admissionDate != null && sb.admissionDate != undefined){
            sb.admissionDate = (this.datePipe.transform(sb.admissionDate, this.orgnizationSetting.datePipe))||('');
          }
          if(sb.accountOpenDate != null && sb.accountOpenDate != undefined){
            sb.accountOpenDate = (this.datePipe.transform(sb.accountOpenDate, this.orgnizationSetting.accountOpenDate))||('');
          }
          if(sb.balance == null || sb.balance == undefined || sb.balance == 0){
            sb.balance = 0;
          }
        }
          return sb
        });
        this.tempGridListData = this.gridListData;
      }
      //  this.commonComponent.stopSpinner();
    }, error => {
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail:  applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
      // this.commonComponent.stopSpinner();
    });
  }

  getAllSbAccountDetailsListByPacsIdAndBranchId() {
    this.savingsAccountService.getSavingsAccountDetailsByPacsIdAndBranchId(this.pacsId, this.branchId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.gridList = this.responseModel.data.map((sb: any) => {
            if (sb != null && sb != undefined && sb.accountOpenDate != null && sb.accountOpenDate != undefined) {
              sb.accountOpenDate = this.datePipe.transform(sb.accountOpenDate, this.orgnizationSetting.datePipe);
            }
            sb.multipartFileListForPhotoCopy = null;
            if(sb.memberPhotoCopyPath != null && sb.memberPhotoCopyPath != undefined)
              sb.multipartFileListForPhotoCopy = this.fileUploadService.getFile(sb.memberPhotoCopyPath ,ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + sb.memberPhotoCopyPath  );
            
            if(sb.balance == null || sb.balance == undefined || sb.balance == 0){
              sb.balance = "0.0/-";
            }
            else{
              sb.balance = sb.balance +"/-";
            }
            return sb
          });
          this.activeStatusCount = this.gridList.filter(sbAccountApplication => sbAccountApplication.status != null && sbAccountApplication.status != undefined && sbAccountApplication.status === applicationConstants.ACTIVE).length;
          this.inactiveStatusCount = this.gridList.filter(sbAccountApplication => sbAccountApplication.status != null && sbAccountApplication.status != undefined && sbAccountApplication.status === applicationConstants.IN_ACTIVE).length;
          this.gridListLenght = this.gridList.length;
          this.tempGridListData = this.gridList;
        }
      } else {
        this.msgs = [];
        this.msgs = [{ severity: "error", summary: 'Failed', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      }
    }, error => {
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }
  edit(rowdata : any){
    this.router.navigate([savingsbanktransactionconstant.VIEW_TRANSACTIONS], { queryParams: { id: this.encryptDecryptService.encrypt(rowdata.id) , editOpt: this.encryptDecryptService.encrypt(applicationConstants.ACTIVE), isGridPage: this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE)}});
  }
  onChange(){
    this.showForm = !this.showForm;
  }

  /**
   * @implement Image Zoom POp up
   * @author jyothi.naidana
   */
  onClickMemberPhotoCopy(sbRowData : any){
    this.memberPhotoCopyZoom = true;
    this.memberphotCopyMultipartFileList = [];
    this.memberphotCopyMultipartFileList = sbRowData.multipartFileListForPhotoCopy ;
  }

  closePhoto(){
    this.memberPhotoCopyZoom = false;
  }
}
