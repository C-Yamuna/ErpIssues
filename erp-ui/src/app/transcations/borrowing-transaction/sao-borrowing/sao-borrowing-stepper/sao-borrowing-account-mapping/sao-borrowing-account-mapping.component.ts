import { Component } from '@angular/core';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { SaoAccountdetails } from '../sao-account-details/shared/sao-accountdetails.model';
import { SaoBorrowingAccountMapping } from './shared/sao-borrowing-account-mapping.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { SaoAccountDetailsService } from '../sao-account-details/shared/sao-account-details.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { DatePipe } from '@angular/common';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { SaoBorrowingAccountMappingService } from './shared/sao-borrowing-account-mapping.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-sao-borrowing-account-mapping',
  templateUrl: './sao-borrowing-account-mapping.component.html',
  styleUrls: ['./sao-borrowing-account-mapping.component.css']
})
export class SaoBorrowingAccountMappingComponent {
  responseModel!: Responsemodel;
  msgs: any[]=[];
  saoAccountdetailsModel :SaoAccountdetails = new SaoAccountdetails();
  saoBorrowingAccountMappingModel:SaoBorrowingAccountMapping = new SaoBorrowingAccountMapping();
  isEdit: any;
  buttonDisabled?: any;
  orgnizationSetting: any;
  gridListData: any[] = [];
  borrowingsAccountMapping: any[] = [];
  date: any;

  tempGridListData: any[] = [];
  gridListLenght: Number | undefined;
  statusList: any[]=[];
  pacsId:any;
  branchId:any;
  borrowingAccountId:any;
  borrowingsAccountMappinglist: any[]=[];
  saoborrowingAccountMappedLoansDTOList: any[] = [];
  constructor(private router: Router, private formBuilder: FormBuilder,
    private saoAccountDetailsService : SaoAccountDetailsService,
    private commonComponent: CommonComponent,private saoBorrowingAccountMappingService:SaoBorrowingAccountMappingService,
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
  ngOnInit() {
    this.pacsId = 1;
    this.branchId = 1;
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.statusList = this.commonComponent.status();
    this.getSaoBorrowingAccountMappedLoansListByPacsIdAndBranchId();
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
   
        this.borrowingAccountId = Number(this.encryptService.decrypt(params['id']));
        this.getBySaoBorrowingAccountId(this.borrowingAccountId);
        if (this.borrowingAccountId != "" && this.borrowingAccountId != null && this.borrowingAccountId != undefined) {
          this.saoAccountDetailsService.getSaoAccountDetailsById(this.borrowingAccountId).subscribe(res => {
            this.responseModel = res;
            this.commonComponent.stopSpinner();
            if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
              this.saoAccountdetailsModel = this.responseModel.data[0];
              if(this.saoAccountdetailsModel.requestedDate != null && this.saoAccountdetailsModel.requestedDate != undefined &&this.saoAccountdetailsModel.requestedDate!=null&&this.saoAccountdetailsModel.requestedDate!= undefined){
                this.saoAccountdetailsModel.requestedDate=this.datePipe.transform(this.saoAccountdetailsModel.requestedDate, this.orgnizationSetting.datePipe);
              }
            }
          });
        }
      }
       else {
        this.isEdit = false;
      }
    }) 
    this.save();
    

  }
  getBySaoBorrowingAccountId(borrowingAccountId:any) {
    this.saoBorrowingAccountMappingService.getBorrowingAccountMappedLoansListByBorrowingAccountId(borrowingAccountId).subscribe((res: Responsemodel) => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
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
      let selectedMapping: SaoBorrowingAccountMapping = {
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
    this.saoborrowingAccountMappedLoansDTOList.forEach(row => {
      let selectedMapping: SaoBorrowingAccountMapping = {
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
    this.saoBorrowingAccountMappingModel.borrowingAccountId = this.borrowingAccountId;
    this.saoAccountDetailsService.changeData({
      data: this.borrowingsAccountMappinglist,
      stepperIndex: 1,
      
    });
  }
 
  navigateToBack(){
    this.router.navigate([]);
  }
 

  getSaoBorrowingAccountMappedLoansListByPacsIdAndBranchId() {
    this.commonComponent.startSpinner();
    this.saoBorrowingAccountMappingService.getAllDisbursementPendingLoans(this.pacsId,this.branchId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel != null&& this.responseModel.data!= undefined && this.responseModel.data.length>0) {
        this.saoborrowingAccountMappedLoansDTOList = this.responseModel.data;
        }
        this.saoborrowingAccountMappedLoansDTOList.forEach(row => {
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
