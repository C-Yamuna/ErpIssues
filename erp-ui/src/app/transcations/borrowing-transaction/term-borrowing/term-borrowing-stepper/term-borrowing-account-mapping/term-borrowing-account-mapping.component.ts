import { Component } from '@angular/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { TermAccountDetails } from '../term-account-details/shared/term-account-details.model';
import { TermBorrowingAccountMapping } from './shared/term-borrowing-account-mapping.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { TermAccountDetailsService } from '../term-account-details/shared/term-account-details.service';
import { TermBorrowingAccountMappingService } from './shared/term-borrowing-account-mapping.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { DatePipe } from '@angular/common';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';

@Component({
  selector: 'app-term-borrowing-account-mapping',
  templateUrl: './term-borrowing-account-mapping.component.html',
  styleUrls: ['./term-borrowing-account-mapping.component.css']
})
export class TermBorrowingAccountMappingComponent {
  responseModel!: Responsemodel;
  msgs: any[]=[];
  termAccountDetailsModel :TermAccountDetails = new TermAccountDetails();
  termBorrowingAccountMappingModel:TermBorrowingAccountMapping = new TermBorrowingAccountMapping();
  isEdit: any;
  buttonDisabled?: any;
  orgnizationSetting: any;
  gridListData: any[] = [];
  borrowingsAccountMapping: any[] = [];
  date: any;
  borrowingAccountId: any;
  tempGridListData: any[] = [];
  gridListLenght: Number | undefined;
  statusList: any[]=[];
  pacsId:any;
  branchId:any;
  borrowingsAccountMappinglist: any[] = [];
  termborrowingAccountMappedLoansDTOList: any[] = [];
  constructor(private router: Router, private formBuilder: FormBuilder,
    private termAccountDetailsService : TermAccountDetailsService,
    private commonComponent: CommonComponent,private termBorrowingAccountMappingService:TermBorrowingAccountMappingService,
    private activateRoute: ActivatedRoute, private encryptService: EncryptDecryptService,
    private datePipe: DatePipe,
     private commonFunctionsService: CommonFunctionsService,
   
  )
  
  { 
    this.borrowingsAccountMapping = [
      { field: 'admissionNo', header: 'BORROWINGSTRANSACTIONS.ADMISSION_NUMBER' },
      { field: 'accountNumber', header: 'BORROWINGSTRANSACTIONS.LOAN_ACCOUNT_NUMBER' },
      { field: 'memberName', header: 'BORROWINGSTRANSACTIONS.NAME' },
      { field: 'sanctionAmount', header: 'BORROWINGSTRANSACTIONS.LOAN_AMOUNT' },
      // { field: '',header:'BORROWINGSTRANSACTIONS.AADHAR_NUMBER'},
      { field: 'purposeName',header:'BORROWINGSTRANSACTIONS.PURPOSE'},
      { field: 'loanDueDate',header:'BORROWINGSTRANSACTIONS.LOAN_DUE_DATE'},
    
    ];
  }
  ngOnInit() {
    this.pacsId = 1;
    this.branchId = 1;
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.statusList = this.commonComponent.status();
    this.gettermBorrowingAccountMappedLoansListByPacsIdAndBranchId();
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
   
        this.borrowingAccountId = Number(this.encryptService.decrypt(params['id']));
        this.getBytermBorrowingAccountId(this.borrowingAccountId);
        if (this.borrowingAccountId != "" && this.borrowingAccountId != null && this.borrowingAccountId != undefined) {
          this.termAccountDetailsService.getTermAccountDetailsById(this.borrowingAccountId).subscribe(res => {
            this.responseModel = res;
            this.commonComponent.stopSpinner();
            if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
              this.termAccountDetailsModel = this.responseModel.data[0];
              if (this.termAccountDetailsModel != null && this.termAccountDetailsModel != undefined) {
              if(this.termAccountDetailsModel.requestedDate != null && this.termAccountDetailsModel.requestedDate != undefined &&this.termAccountDetailsModel.requestedDate!=null&&this.termAccountDetailsModel.requestedDate!= undefined){
                this.termAccountDetailsModel.requestedDate=this.datePipe.transform(this.termAccountDetailsModel.requestedDate, this.orgnizationSetting.datePipe);
              }
            }
            }
            else {
              this.commonComponent.stopSpinner();
              this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
              setTimeout(() => {
                this.msgs = [];
              }, 2000);
            }
          }, error => {
              this.msgs = [];
              this.msgs = [{ severity: "error", summary: 'Failed', detail:  applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
              this.commonComponent.stopSpinner();
            });
 
        }
        
      }
    }) 
    this.save();
    

  }

 /**
   * @author vinitha
   * @implements get mapped loans data by borrowing account Id
   */
  getBytermBorrowingAccountId(borrowingAccountId:any) {
    this.termBorrowingAccountMappingService.getBorrowingAccountMappedLoansListByBorrowingAccountId(borrowingAccountId).subscribe((res: Responsemodel) => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
        if (this.responseModel != null&& this.responseModel.data!= undefined && this.responseModel.data.length>0) {
        this.borrowingsAccountMappinglist = this.responseModel.data;
        this.updateData();
        }
      } else {
        this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
    });
  }

  onSelectCheckBox(event: any, rowData: any) {
    if (event.checked) {
      let selectedMapping: TermBorrowingAccountMapping = {
        status: this.statusList[0].value, 
        statusName: this.statusList[0].label,
        pacsId: rowData.pacsId,
        branchId: rowData.branchId,
        borrowingAccountId :this.borrowingAccountId,
        loanMemberAdmissionNumber: rowData.admissionNo,
        loanAccountNumber: rowData.accountNumber,
        memberName: rowData.memberName,
        loanAmount: rowData.sanctionAmount,
        purpose:rowData.purposeId,
        purposeName: rowData.purposeName,
   
      };
      this.borrowingsAccountMappinglist.push(selectedMapping);
    } else {
      this.borrowingsAccountMappinglist = this.borrowingsAccountMappinglist.filter(item => item.loanAccountNumber !== rowData.accountNumber);
    }
    this.updateData();
  }
selectAll(event: any) {
  if (event.checked) {
    this.termborrowingAccountMappedLoansDTOList.forEach(row => {
      let selectedMapping: TermBorrowingAccountMapping = {
        pacsId: row.pacsId,
        branchId: row.branchId,
        borrowingAccountId :this.borrowingAccountId,
        loanMemberAdmissionNumber: row.admissionNo,
        loanAccountNumber: row.accountNumber,
        memberName: row.memberName,
        loanAmount: row.sanctionAmount,
        purpose:row.purposeId,
        purposeName: row.purposeName,

      };
      this.borrowingsAccountMappinglist.push(selectedMapping);
    });
  } else {
    this.borrowingsAccountMappinglist = [];
  }
}
  save() {
    this.updateData();
  }

 
 
  updateData() {
    this.termBorrowingAccountMappingModel.borrowingAccountId = this.borrowingAccountId;
    this.termAccountDetailsService.changeData({
      data: this.borrowingsAccountMappinglist,
      stepperIndex: 1,
      
    });
  }
 
  navigateToBack(){
    this.router.navigate([]);
  }
 

 /**
   * @author vinitha
   * @implements get all disbursement pending loans by pacsId and BranchId(get from loans)
   */
  gettermBorrowingAccountMappedLoansListByPacsIdAndBranchId() {
    this.commonComponent.startSpinner();
    this.termBorrowingAccountMappingService.getAllDisbursementPendingLoans(this.pacsId,this.branchId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
        if (this.responseModel != null&& this.responseModel.data!= undefined && this.responseModel.data.length>0) {
        this.termborrowingAccountMappedLoansDTOList = this.responseModel.data;
        }
        this.termborrowingAccountMappedLoansDTOList.forEach(row => {
          row.selected = this.borrowingsAccountMappinglist.some(item => 
            item.loanAccountNumber != null && item.loanAccountNumber != undefined && row.accountNumber != null  && row.accountNumber != undefined &&
            item.loanAccountNumber === row.accountNumber
          );
        });
        this.commonComponent.stopSpinner();
      } else {
        this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
    });
  }

}
