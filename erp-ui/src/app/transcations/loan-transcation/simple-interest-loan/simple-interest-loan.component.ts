import { Component } from '@angular/core';
import { Loantransactionconstant } from '../loan-transaction-constant';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { SiTransactionDetailsService } from '../shared/si-loans/si-transaction-details.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { DatePipe } from '@angular/common';
import { SiLoanApplication } from '../shared/si-loans/si-loan-application.model';

@Component({
  selector: 'app-simple-interest-loan',
  templateUrl: './simple-interest-loan.component.html',
  styleUrls: ['./simple-interest-loan.component.css']
})
export class SimpleInterestLoanComponent {

  siLoanApplicationModel: SiLoanApplication = new SiLoanApplication();
  responseModel!: Responsemodel;
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  isMemberCreation: boolean = false;
  orgnizationSetting: any;
  operations: any;
  operationslist: any;
  value: number = 0;
  msgs: any[] = [];
  columns: any[] = [];
  gridList: any[] = [];
  showForm: boolean=false;
  activeStatusCount: number = 0;
  inactiveStatusCount: number = 0;

  constructor(private router: Router, private translate: TranslateService, private commonFunctionsService: CommonFunctionsService,
    private encryptDecryptService: EncryptDecryptService, private commonComponent: CommonComponent,
    private siTransactionDetailsService: SiTransactionDetailsService, private datePipe: DatePipe) {

  }

  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.commonFunctionsService.setStorageValue('language', 'en');
    this.commonFunctionsService.data.subscribe((res: any) => {
      if (res) {
        this.translate.use(res);
      } else {
        this.translate.use('en');
      }
    });
    this.columns = [
      { field: 'accountNumber', header: 'ERP.ACCOUNT_NUMBER' },
      { field: 'admissionNo', header: 'ERP.ADMISSION_NUMBER' },
      { field: 'applicationDateVal', header: 'ERP.APPLICATION_DATE' },
      { field: 'sanctionDateVal', header: 'ERP.SANCTION_DATE' },
      { field: 'repaymentFrequencyName', header: 'ERP.REPAYMENT_FREQUENCY' },
      { field: 'accountStatusName', header: 'ERP.STATUS' }
    ];
    this.operationslist = [
      { label: "Disbursement", value: 1 },
      { label: "Collection", value: 2 },
      { label: "Closure", value: 3 },
    ]
    this.getAll();
  }

  getAll() {
    this.siTransactionDetailsService.getAllSITransactionDetails().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          this.gridList = this.responseModel.data;
          this.gridList = this.responseModel.data.map((member: any) => {
            member.applicationDateVal = this.datePipe.transform(member.applicationDate, this.orgnizationSetting.datePipe);
            member.sanctionDateVal = this.datePipe.transform(member.sanctionDate, this.orgnizationSetting.datePipe);
            return member;
          });
        } else {
          this.msgs = [];
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }
    }, error => {
      this.msgs = [];
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
    });
  }

  createSILoanAccount() {
    this.commonFunctionsService.setStorageValue('b-class-member_creation', false);
    this.commonFunctionsService.setStorageValue(applicationConstants.INDIVIDUAL_MEMBER_DTAILS, null);
    this.commonFunctionsService.setStorageValue(applicationConstants.GROUP_DETAILS, null);
    this.commonFunctionsService.setStorageValue(applicationConstants.INSTITUTION_DETAILS, null);
    this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_KYC], { queryParams: { createLoanFlag: this.encryptDecryptService.encrypt(true) } });
  }

  edit(rowData: any) {
    this.router.navigate([Loantransactionconstant.VIEW_SIMPLE_INTEREST_LOAN], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id), editOpt: this.encryptDecryptService.encrypt(applicationConstants.ACTIVE),isGridPage:this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE)  } });
  }

  view(rowData: any) {
    this.router.navigate([Loantransactionconstant.VIEW_SIMPLE_INTEREST_LOAN], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id),isGridPage:this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE)  } });
  }

  onChange() {
    this.isMemberCreation = !this.isMemberCreation;
  }

  navigateToInfoDetails(event: any, rowData: any) {
    if (event.value === 1)
      this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOAN_DISBURSEMENTS], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
    else if (event.value === 2)
      this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOAN_COLLECTIONS], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
    else if (event.value === 3)
      this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOAN_CLOSURE], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  onSearch(){
    this.showForm = !this.showForm;
  }

}
