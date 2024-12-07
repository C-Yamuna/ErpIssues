import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoanConfigConstants } from '../loan-config-constants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { LoanPurposeService } from './shared/loan-purpose.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';

@Component({
  selector: 'app-loan-purpose',
  templateUrl: './loan-purpose.component.html',
  styleUrls: ['./loan-purpose.component.css']
})
export class LoanPurposeComponent {
  loanpurpose: any[] = [];
  msgs: any[] = [];
  responseModel!: Responsemodel;
  gridList: any[] = [];
  id :  any;
  deleteId: any;
  displayDialog: boolean = false;
  constructor(private router: Router,private encryptDecryptService: EncryptDecryptService,private loanPurposeService : LoanPurposeService,
    private commonComponent: CommonComponent,
  )
     { 
      this.loanpurpose = [
        { field: 'name', header: 'LOANS.NAME' },
        { field: 'description', header: 'LOANS.DESCRIPTION' },
        { field: 'statusName', header: 'LOANS.STATUS' },
      ];
     }
  ngOnInit() {
    this.getAll();
  }
  addData(){
    this.router.navigate([LoanConfigConstants.ADD_LOAN_PURPOSE]);
  }
  getAll(){
    this.loanPurposeService.getAllLoanPurpose().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.gridList = this.responseModel.data;
        //this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      } else {
        this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    });
  }
  delete(rowData:any){
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }
  submit() {
    this.commonComponent.startSpinner();
    this.loanPurposeService.deleteLoanPurpose(this.deleteId).subscribe(response => {
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
  navigateToEdit(rowData:any){
    this.router.navigate([LoanConfigConstants.ADD_LOAN_PURPOSE], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } })
  }
}
