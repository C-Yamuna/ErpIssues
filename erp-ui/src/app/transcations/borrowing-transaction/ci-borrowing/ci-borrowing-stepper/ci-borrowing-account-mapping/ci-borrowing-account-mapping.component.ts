import { Component } from '@angular/core';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CiAccountDetails } from '../ci-account-details/shared/ci-account-details.model';
import { CiBorrowingAccountMapping } from './shared/ci-borrowing-account-mapping.model';
import { FormBuilder } from '@angular/forms';
import { CiAccountDetailsService } from '../ci-account-details/shared/ci-account-details.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import {  CiBorrowingAccountMappingService } from './shared/ci-borrowing-account-mapping.service';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-ci-borrowing-account-mapping',
  templateUrl: './ci-borrowing-account-mapping.component.html',
  styleUrls: ['./ci-borrowing-account-mapping.component.css']
})
export class CiBorrowingAccountMappingComponent {
  responseModel!: Responsemodel;
  msgs: any[]=[];
  ciborrowingAccountDetailsModel :CiAccountDetails = new CiAccountDetails();
  ciBorrowingAccountMappingModel:CiBorrowingAccountMapping = new CiBorrowingAccountMapping();
  isEdit: any;
  buttonDisabled: boolean = false;
  orgnizationSetting: any;
  gridListData: any[] = [];
  borrowingsAccountMapping: any[] = [];
  date: any;
  statusList:any[]=[];
  tempGridListData: any[] = [];
  gridListLenght: Number | undefined;
  pacsId:any;
  branchId:any;
  borrowingAccountId:any;

  borrowingsAccountMappinglist:any[]=[];
  ciBorrowingAccountMappedLoansDTOList: any []= [];
  constructor(private router: Router, private formBuilder: FormBuilder,
    private ciAccountDetailsService : CiAccountDetailsService,
    private commonComponent: CommonComponent,private ciBorrowingAccountMappingService:CiBorrowingAccountMappingService,
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
      { field: 'purposeName',header:'BORROWINGSTRANSACTIONS.PURPOSE'},

    
    ];
  }
     /**
   * @author vinitha
   * @implements get account details based on borrowing accountId
   */
  ngOnInit() {
    this.pacsId = 1;
    this.branchId = 1;
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.statusList = this.commonComponent.status();
    this.getCiBorrowingAccountMappedLoansListByPacsIdAndBranchId();
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
   
        this.borrowingAccountId = Number(this.encryptService.decrypt(params['id']));
        this.getByCiBorrowingAccountId(this.borrowingAccountId);
        if (this.borrowingAccountId != "" && this.borrowingAccountId != null && this.borrowingAccountId != undefined) {
          this.ciAccountDetailsService.getCiAccountDetailsById(this.borrowingAccountId).subscribe(res => {
            this.responseModel = res;
            this.commonComponent.stopSpinner();
            if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
              this.ciborrowingAccountDetailsModel = this.responseModel.data[0];
              if (this.ciborrowingAccountDetailsModel != null && this.ciborrowingAccountDetailsModel != undefined) {
              if(this.ciborrowingAccountDetailsModel.requestedDate != null && this.ciborrowingAccountDetailsModel.requestedDate != undefined &&this.ciborrowingAccountDetailsModel.requestedDate!=null&&this.ciborrowingAccountDetailsModel.requestedDate!= undefined){
                this.ciborrowingAccountDetailsModel.requestedDate=this.datePipe.transform(this.ciborrowingAccountDetailsModel.requestedDate, this.orgnizationSetting.datePipe);
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
   * @implements get mapped loans data based on borrowing accountId
   */
  getByCiBorrowingAccountId(borrowingAccountId:any) {
    this.ciBorrowingAccountMappingService.getBorrowingAccountMappedLoansListByBorrowingAccountId(borrowingAccountId).subscribe((res: Responsemodel) => {
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
      let selectedMapping: CiBorrowingAccountMapping = {
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
    this.ciBorrowingAccountMappedLoansDTOList.forEach(row => {
      let selectedMapping: CiBorrowingAccountMapping = {
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
    this.ciAccountDetailsService.changeData({
      data: this.borrowingsAccountMappinglist,
      stepperIndex: 1,
      
    });
  }
 
  navigateToBack(){
    this.router.navigate([]);
  }
 
   /**
   * @author vinitha
   * @implements get Disbursement Pending Loans data based on pacsid and branchid(get from loans)
   */
  getCiBorrowingAccountMappedLoansListByPacsIdAndBranchId() {
    this.commonComponent.startSpinner();
    this.ciBorrowingAccountMappingService.getAllDisbursementPendingLoans(this.pacsId,this.branchId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
        if (this.responseModel != null&& this.responseModel.data!= undefined && this.responseModel.data.length>0) {
        this.ciBorrowingAccountMappedLoansDTOList = this.responseModel.data;
        }
        this.ciBorrowingAccountMappedLoansDTOList.forEach(row => {
          row.selected = this.borrowingsAccountMappinglist.some(item => 
            item.loanAccountNumber != null  && item.loanAccountNumber != undefined && row.accountNumber != null && row.accountNumber != undefined  && 
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
