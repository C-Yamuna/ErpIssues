import { SiLoanApplication } from './../../../shared/si-loans/si-loan-application.model';
import { SiLoanDisbursement } from './../../../shared/si-loans/si-loan-disbursement.model';
import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Loantransactionconstant } from '../../../loan-transaction-constant';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { Table } from 'primeng/table';
import { SiDisbursementService } from '../../../shared/si-loans/si-disbursement.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-simple-interest-loan-disbursement',
  templateUrl: './simple-interest-loan-disbursement.component.html',
  styleUrls: ['./simple-interest-loan-disbursement.component.css']
})
export class SimpleInterestLoanDisbursementComponent {

  orgnizationSetting: any;
  disbursementForm: FormGroup;
  siLoanApplicationModel: SiLoanApplication = new SiLoanApplication();
  siLoanDisbursementModel: SiLoanDisbursement = new SiLoanDisbursement();
  isEdit: boolean = false;
  responseModel!: Responsemodel;
  siLoanDisbursementList: any[] = [];
  loanAccId: any;
  msgs: any[] = [];
  showForm: boolean = false;

  rowEdit: boolean = false;

  @ViewChild('dt', { static: false }) private dt!: Table;

  addButtonService: boolean = false;
  editDeleteDisable: boolean = false;

  siLoanDisbursementColumns: any[] = [];
  buttonDisabled: boolean = true;
  pacsId: any;
  branchId: any;
  pacsCode: any;

  isRowView: Boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private commonFunctionsService: CommonFunctionsService,
    private encryptDecryptService: EncryptDecryptService, private commonComponent: CommonComponent, private datePipe: DatePipe,
    private activateRoute: ActivatedRoute, private siDisbursementService: SiDisbursementService) {

    this.siLoanDisbursementColumns = [
      { field: 'siProductName', header: 'LOANS.PRODUCT_NAME' },
      { field: 'accountNumber', header: 'LOANS.ACCOUNT_NUMBER' },
      { field: 'disbursementDateVal', header: 'LOANS.DISBURSEMENT_DATE' },
      { field: 'disbursementAmount', header: 'LOANS.DISBURSEMENT_AMOUNT' },
      { field: 'transactionDateVal', header: 'LOANS.TRANSACTION_DATE' },
      { field: 'statusName', header: 'LOANS.STATUS' }
    ];

    this.disbursementForm = this.formBuilder.group({
      'siProductName': new FormControl('', Validators.required),
      'accountNumber': new FormControl('', Validators.required),
      'disbursementDate': new FormControl('', Validators.required),
      'disbursementAmount': new FormControl('', Validators.required),
      'transactionDate': new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
    this.commonFunctionsService.setStorageValue('language', 'en');
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.pacsId = this.commonFunctionsService.getStorageValue(applicationConstants.PACS_ID);
    this.branchId = this.commonFunctionsService.getStorageValue(applicationConstants.BRANCH_ID);
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.loanAccId = this.encryptDecryptService.decrypt(params['id']);
        this.getSILoanDisbursementsById(this.loanAccId);
        this.isEdit = true;
      } else {
        this.isEdit = false;
        this.siLoanDisbursementModel = new SiLoanDisbursement();
      }
    });
  }

  getSILoanDisbursementsById(id: any) {
    this.siDisbursementService.getSIDisbursementListByApplicationId(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0) {
            this.siLoanDisbursementList = this.responseModel.data;

            for (let disbursement of this.siLoanDisbursementList) {
              if (disbursement.disbursementDate != null && disbursement.disbursementDate != undefined)
                disbursement.disbursementDateVal = this.datePipe.transform(disbursement.disbursementDate, this.orgnizationSetting.datePipe);

              if (disbursement.transactionDate != null && disbursement.transactionDate != undefined)
                disbursement.transactionDateVal = this.datePipe.transform(disbursement.transactionDate, this.orgnizationSetting.datePipe);

              if (disbursement.statusName != null && disbursement.statusName != undefined && disbursement.statusName === "Created")
                disbursement.isEditShow = applicationConstants.TRUE;
              else
                disbursement.isEditShow = applicationConstants.FALSE;
            }
          }
        }
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }


  saveDisbursement() {
    // this.siLoanDisbursementModel.pacsCode = this.pacsCode;
    this.siLoanDisbursementModel.pacsId = this.pacsId;
    this.siLoanDisbursementModel.branchId = this.branchId;

    if (this.siLoanDisbursementModel.disbursementDateVal != undefined)
      this.siLoanDisbursementModel.disbursementDate = this.commonFunctionsService.getUTCEpoch(new Date(this.siLoanDisbursementModel.disbursementDateVal));

    if (this.siLoanDisbursementModel.transactionDateVal != undefined)
      this.siLoanDisbursementModel.transactionDate = this.commonFunctionsService.getUTCEpoch(new Date(this.siLoanDisbursementModel.transactionDateVal));

    this.siLoanDisbursementModel.statusName = 'Created'
    this.addButtonService = true;
    this.editDeleteDisable = true;
    this.siDisbursementService.addSIDisbursement(this.siLoanDisbursementModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.addButtonService = false;

        this.getSILoanDisbursementsById(this.loanAccId);
        this.resetDisbrusmentFormData();

        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);

      } else {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      }
    },
      error => {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      });
    this.disableForm();
  }

  resetDisbrusmentFormData() {
    this.siLoanDisbursementModel.siProductName = null;
    this.siLoanDisbursementModel.accountNumber = null;
    this.siLoanDisbursementModel.disbursementDateVal = null;
    this.siLoanDisbursementModel.disbursementAmount = null;
    this.siLoanDisbursementModel.transactionDateVal = null;

    this.enableForm();
  }

  clearDisbursement() {
    this.siLoanDisbursementModel = new SiLoanDisbursement();
    this.addButtonService = false;
    this.editDeleteDisable = false;

    this.enableForm();
  }

  delete(row: any) {
    this.siDisbursementService.deleteSIDisbursement(row.id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.siLoanDisbursementList = this.responseModel.data;
        this.getSILoanDisbursementsById(this.loanAccId);
      }
    });
  }

  editRow(rowData: any) {
    this.isRowView = false;
    this.siLoanDisbursementModel.siProductId = rowData.siProductId;
    this.siLoanDisbursementModel.siLoanApplicationId = rowData.siLoanApplicationId;
    this.siLoanDisbursementModel.siProductName = rowData.siProductName;
    this.siLoanDisbursementModel.accountNumber = rowData.accountNumber;
    this.siLoanDisbursementModel.disbursementDateVal = rowData.disbursementDateVal;
    this.siLoanDisbursementModel.disbursementAmount = rowData.disbursementAmount;
    this.siLoanDisbursementModel.transactionDateVal = rowData.transactionDateVal;
    this.siLoanDisbursementModel.id = rowData.id;
    this.rowEdit = true;

    this.disableForm();
  }

  viewRow(rowData: any) {
    this.isRowView = true;
    this.siLoanDisbursementModel.siProductId = rowData.siProductId;
    this.siLoanDisbursementModel.siLoanApplicationId = rowData.siLoanApplicationId;
    this.siLoanDisbursementModel.siProductName = rowData.siProductName;
    this.siLoanDisbursementModel.accountNumber = rowData.accountNumber;
    this.siLoanDisbursementModel.disbursementDateVal = rowData.disbursementDateVal;
    this.siLoanDisbursementModel.disbursementAmount = rowData.disbursementAmount;
    this.siLoanDisbursementModel.transactionDateVal = rowData.transactionDateVal;
    this.siLoanDisbursementModel.id = rowData.id;
    this.rowEdit = true;

    this.disableForm();
  }

  disableFormControl(controlName: string): void {
    this.disbursementForm.get(controlName)?.disable();
  }

  enableFormControl(controlName: string): void {
    this.disbursementForm.get(controlName)?.enable();
  }

  back() {
    this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_TRANSACTION]);
  }

  disableForm() {
    this.disableFormControl('siProductName');
    this.disableFormControl('accountNumber');
    if (this.isRowView)
      this.disableFormControl('disbursementDate');
    else
      this.enableFormControl('disbursementDate');

    this.disableFormControl('disbursementAmount');
    this.disableFormControl('transactionDate');
  }

  enableForm() {
    this.enableFormControl('siProductName');
    this.enableFormControl('accountNumber');
    this.enableFormControl('disbursementDate');
    this.enableFormControl('disbursementAmount');
    this.enableFormControl('transactionDate');
  }
  isBasicDetails: boolean = false;
  position: string = 'center';
  showBasicDetailsDialog(position: string) {
    this.position = position;
    this.isBasicDetails = true;
  }
  onClickMemberIndividualMoreDetails(){
    this.showForm = true
  }
}
