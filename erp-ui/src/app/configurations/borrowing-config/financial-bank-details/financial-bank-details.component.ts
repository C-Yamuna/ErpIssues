import { Component } from '@angular/core';
import { FinancialBankDetails } from './shared/financial-bank-details.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Router } from '@angular/router';
import { FinancialBankDetailsService } from './shared/financial-bank-details.service';
import { BorrowingConfigConstants } from '../borrowing-config-constants';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-financial-bank-details',
  templateUrl: './financial-bank-details.component.html',
  styleUrls: ['./financial-bank-details.component.css']
})
export class FinancialBankDetailsComponent {
  products: [] = [];
  columns: any[] = [];
  gridListData: any[] = [];
  tempGridListData: any[] = [];
  msgs: any[] = [];
  gridListLength: Number | undefined;
  getAllUrl: any;
  financialBankDetailsModel: FinancialBankDetails = new FinancialBankDetails();
  displayDialog: boolean = false;
  responseModel!: Responsemodel;
  deleteId:any;
  constructor(private router: Router, private financialBankDetailsService: FinancialBankDetailsService,
    private encryptDecryptService: EncryptDecryptService,
  ) {
    this.columns = [
      { field: 'bankName', header: 'BORROWINGSCONFIG.BANK_NAME' },
      { field: 'ifscCode', header: 'BORROWINGSCONFIG.IFSC_CODE' },
      { field: 'branchName', header: 'BORROWINGSCONFIG.BRANCH_NAME' },
      { field: 'address', header: 'BORROWINGSCONFIG.ADDRESS' },
      { field: 'description', header: 'BORROWINGSCONFIG.DESCRIPTION' },
      { field: 'statusName', header: 'BORROWINGSCONFIG.STATUS' },
    ];

  }
  ngOnInit(): void {
    this.getAll();
  }
  addfinancialdetails() {
    this.router.navigate([BorrowingConfigConstants.ADD_FINANCIAL_BANK_DETAILS]);
  }
  getAll() {
    this.financialBankDetailsService.getAllFinancialBankDetails().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.gridListData = this.responseModel.data;
      } else {
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    });
  }

  editfinancialdetails(rowData: any) {
    this.router.navigate([BorrowingConfigConstants.ADD_FINANCIAL_BANK_DETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  
  deleteData(rowData: any) {
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }

  submit() {
    // this.commonComponent.startSpinner();
    this.financialBankDetailsService.deleteFinancialBankDetails(this.deleteId).subscribe(response => {
      this.responseModel = response;
      this.msgs = [];
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        // this.commonComponent.stopSpinner();
        this.displayDialog = false;
        this.msgs = [];
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
          this.getAll();
        }, 2000);
      } else {
        this.displayDialog = false;
        // this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    }, error => {
      // this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    });
  }
  cancel() {
    this.displayDialog = false;
  }

}
