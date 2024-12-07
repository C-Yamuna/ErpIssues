import { SiCollectionService } from './../../../shared/si-loans/si-collection.service';
import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { Loantransactionconstant } from '../../../loan-transaction-constant';
import { SiLoanApplication } from '../../../shared/si-loans/si-loan-application.model';
import { SiLoanCollection } from '../../../shared/si-loans/si-loan-collection.model';

@Component({
  selector: 'app-simple-interest-loan-collection',
  templateUrl: './simple-interest-loan-collection.component.html',
  styleUrls: ['./simple-interest-loan-collection.component.css']
})
export class SimpleInterestLoanCollectionComponent {
  orgnizationSetting: any;
  collectionForm: FormGroup;
  siLoanApplicationModel: SiLoanApplication = new SiLoanApplication();
  siLoanCollectionModel: SiLoanCollection = new SiLoanCollection();
  isEdit: boolean = false;
  responseModel!: Responsemodel;
  siLoanCollectionList: any[] = [];
  loanAccId: any;
  msgs: any[] = [];
  rowEdit: boolean = false;
  @ViewChild('dt', { static: false }) private dt!: Table;
  addButtonService: boolean = false;
  editDeleteDisable: boolean = false;
  siLoanDisbursementColumns: any[] = [];
  buttonDisabled: boolean = true;
  pacsId: any;
  branchId: any;
  pacsCode: any;
  paymentModeList: any[] = [];
  showForm: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder,
    private commonFunctionsService: CommonFunctionsService,
    private encryptDecryptService: EncryptDecryptService, private commonComponent: CommonComponent, private datePipe: DatePipe,
    private activateRoute: ActivatedRoute,
    private siCollectionService: SiCollectionService) {

    this.siLoanDisbursementColumns = [
      { field: 'productName', header: 'LOANS.PRODUCT_NAME' },
      { field: 'accountNumber', header: 'LOANS.ACCOUNT_NUMBER' },
      { field: 'collectionDateVal', header: 'LOANS.COLLECTION_DATE' },
      { field: 'totalCollectionAmount', header: 'LOANS.TOTAL_COLLECTION_AMOUNT' },
      { field: 'transactionDateVal', header: 'LOANS.TRANSACTION_DATE' },
      { field: 'paymentModeName', header: 'LOANS.PAYMENT_MODE' },
      { field: 'referenceNumber', header: 'LOANS.REFERENCE_NUMBER' },
      { field: 'statusName', header: 'LOANS.STATUS' }
    ];

    this.collectionForm = this.formBuilder.group({
      'productName': new FormControl({ value: '', disabled: true }, Validators.required),
      'accountNumber': new FormControl({ value: '', disabled: true }, Validators.required),
      'collectionDate': new FormControl('', Validators.required),
      'totalCollectionAmount': new FormControl('', Validators.required),
      'transactionDate': new FormControl('', Validators.required),
      'paymentMode': new FormControl('', Validators.required),
      'referenceNumber': new FormControl('', Validators.required),
    })
  }

  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.pacsId = this.commonFunctionsService.getStorageValue(applicationConstants.PACS_ID);
    this.branchId = this.commonFunctionsService.getStorageValue(applicationConstants.BRANCH_ID);
    this.getAllPaymentModes();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.loanAccId = this.encryptDecryptService.decrypt(params['id']);
        this.getSICollectionByApplicationId(this.loanAccId);
        // this.isEdit = true;
      } else {
        // this.isEdit = false;
        this.siLoanCollectionModel = new SiLoanCollection();
      }
    });
  }

  getSICollectionByApplicationId(id: any) {

    this.siCollectionService.getSICollectionByApplicationId(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0) {
            this.siLoanApplicationModel = this.responseModel.data[0];

            if (this.siLoanApplicationModel.siCollectionDTOList != undefined && this.siLoanApplicationModel.siCollectionDTOList != null
              && this.siLoanApplicationModel.siCollectionDTOList.length > 0) {
              this.siLoanCollectionList = this.siLoanApplicationModel.siCollectionDTOList;

              for (let collection of this.siLoanCollectionList) {
                if (this.siLoanApplicationModel.accountNumber != null)
                  collection.accountNumber = this.siLoanApplicationModel.accountNumber;

                if (collection.collectionDate != null && collection.collectionDate != undefined)
                  collection.collectionDateVal = this.datePipe.transform(collection.collectionDate, this.orgnizationSetting.datePipe);

                if (collection.transactionDate != null && collection.transactionDate != undefined)
                  collection.transactionDateVal = this.datePipe.transform(collection.transactionDate, this.orgnizationSetting.datePipe);

                if (collection.statusName != null && collection.statusName != undefined && collection.statusName === "Created")
                  collection.isEditShow = applicationConstants.TRUE;
                else
                  collection.isEditShow = applicationConstants.FALSE;
              }
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

  saveCollection() {
    // this.siLoanCollectionModel.pacsCode = this.pacsCode;
    this.siLoanCollectionModel.pacsId = this.pacsId;
    this.siLoanCollectionModel.branchId = this.branchId;
    this.siLoanCollectionModel.siLoanApplicationId = this.siLoanApplicationModel.id;
    this.siLoanCollectionModel.siProductId = this.siLoanApplicationModel.siProductId;

    if (this.siLoanCollectionModel.collectionDateVal != undefined)
      this.siLoanCollectionModel.collectionDate = this.commonFunctionsService.getUTCEpoch(new Date(this.siLoanCollectionModel.collectionDateVal));

    if (this.siLoanCollectionModel.transactionDateVal != undefined)
      this.siLoanCollectionModel.transactionDate = this.commonFunctionsService.getUTCEpoch(new Date(this.siLoanCollectionModel.transactionDateVal));

    this.siLoanCollectionModel.statusName = 'Created'
    this.addButtonService = true;
    this.editDeleteDisable = true;
    if (this.isEdit) {
      this.siCollectionService.updateSICollection(this.siLoanCollectionModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
        } else {
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
        this.getSICollectionByApplicationId(this.loanAccId);
        this.resetCollectionFormData();
      }, error => {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      });
    }
    else {
      this.siCollectionService.addSICollection(this.siLoanCollectionModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
        } else {
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
        this.getSICollectionByApplicationId(this.loanAccId);
        this.resetCollectionFormData();
      }, error => {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      });
    }
  }

  resetCollectionFormData() {
    this.siLoanCollectionModel.collectionDateVal = null;
    this.siLoanCollectionModel.totalCollectionAmount = null;
    this.siLoanCollectionModel.transactionDateVal = null;
    this.siLoanCollectionModel.paymentMode = null;
    this.siLoanCollectionModel.referenceNumber = null;
  }

  clearCollection() {
    this.siLoanCollectionModel = new SiLoanCollection();
    this.addButtonService = false;
    this.editDeleteDisable = false;
  }

  delete(row: any) {
    this.siCollectionService.deleteSICollection(row.id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.siLoanCollectionList = this.responseModel.data;
        this.getSICollectionByApplicationId(this.loanAccId);
      }
    });
  }

  editRow(rowData: any) {
    this.siLoanCollectionModel.siProductId = rowData.siProductId;
    this.siLoanCollectionModel.siLoanApplicationId = rowData.siLoanApplicationId;
    this.siLoanCollectionModel.productName = rowData.productName;
    this.siLoanCollectionModel.accountNumber = rowData.accountNumber;
    this.siLoanCollectionModel.collectionDateVal = rowData.collectionDateVal;
    this.siLoanCollectionModel.totalCollectionAmount = rowData.totalCollectionAmount;
    this.siLoanCollectionModel.transactionDateVal = rowData.transactionDateVal;
    this.siLoanCollectionModel.paymentMode = rowData.paymentMode;
    this.siLoanCollectionModel.referenceNumber = rowData.referenceNumber;
    this.siLoanCollectionModel.id = rowData.id;
    this.rowEdit = true;
    this.isEdit = true;
  }

  disableFormControl(controlName: string): void {
    this.collectionForm.get(controlName)?.disable();
  }

  enableFormControl(controlName: string): void {
    this.collectionForm.get(controlName)?.enable();
  }

  back() {
    this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_TRANSACTION]);
  }

  onChangePaymentMode(event: any) {
    if (event.value != null && event.value != undefined) {
      const filteredItem = this.paymentModeList.find((item: { value: any; }) => item.value === event.value);
      this.siLoanCollectionModel.paymentMode = filteredItem.value;
    }
  }

  getAllPaymentModes() {
    this.paymentModeList =
      [
        { label: "Cash", value: 1 },
        { label: "Cheque", value: 2 },
        { label: "Transfer", value: 3 }
      ]
  }
  onClickMemberIndividualMoreDetails(){
    this.showForm = true
  }
  isBasicDetails: boolean = false;
  position: string = 'center';
  showBasicDetailsDialog(position: string) {
    this.position = position;
    this.isBasicDetails = true;
  }
}

