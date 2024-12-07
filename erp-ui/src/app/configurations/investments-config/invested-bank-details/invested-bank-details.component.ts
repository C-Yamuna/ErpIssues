import { Component, OnInit } from '@angular/core';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { InvestedBankDetails } from './shared/invested-bank-details.model';
import { Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { InvestedBankDetailsService } from './shared/invested-bank-details.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { InvestmentsConfigConstants } from '../investments-config-constants';

@Component({
  selector: 'app-invested-bank-details',
  templateUrl: './invested-bank-details.component.html',
  styleUrls: ['./invested-bank-details.component.css']
})
export class InvestedBankDetailsComponent implements OnInit{
  columns: any[] = [];
  msgs: any[] = [];
  gridListData: any[] = [];
  responseModel!: Responsemodel;
  statusList: any[]=[];
  investedBankDetailsModel: InvestedBankDetails = new InvestedBankDetails();
  displayDialog: boolean = false;
  deleteId: any;

  constructor(private router: Router, 
    private encryptDecryptService :EncryptDecryptService,
    private commonComponent: CommonComponent,
    private investedBankDetailsService:InvestedBankDetailsService){ }

  ngOnInit() {
    this.columns = [
      { field: 'bankName', header: 'INVESTMENTSCONFIG.BANK_NAME' },
      { field: 'branchName', header: 'INVESTMENTSCONFIG.BRANCH_NAME' },
      { field: 'bankIfscCode', header: 'INVESTMENTSCONFIG.IFSC_CODE' },
      { field: 'pocName', header: 'INVESTMENTSCONFIG.POC_NAME' },
      { field: 'pocNumber', header: 'INVESTMENTSCONFIG.POC_NUMBER' },
      { field: 'pocEmail', header: 'INVESTMENTSCONFIG.POC_EMAIL' },
      { field: 'bankAddress', header: 'INVESTMENTSCONFIG.BANK_ADDRESS' },
      { field: 'statusName', header: 'INVESTMENTSCONFIG.STATUS' },
    ];
    this.getAll();
  }


  getAll(){
    this.commonComponent.startSpinner();
    this.investedBankDetailsService.getAllInvestedBankDetails().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.gridListData = this.responseModel.data;
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

  addData(){
    this.router.navigate([InvestmentsConfigConstants.ADD_INVESTED_BANK_DETAILS]);
  }

  editData(rowData: any) {
    this.router.navigate([InvestmentsConfigConstants.ADD_INVESTED_BANK_DETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  deleteData(rowData: any) {
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }
  submit() {
    this.commonComponent.startSpinner();
    this.investedBankDetailsService.deleteInvestedBankDetails(this.deleteId).subscribe(response => {
      this.responseModel = response;
      this.msgs = [];
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.commonComponent.stopSpinner();
        this.displayDialog = false;
        this.msgs = [];
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
          this.getAll();
        }, 2000);
      } else {
        this.displayDialog = false;
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    }, error => {
      this.commonComponent.stopSpinner();
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
