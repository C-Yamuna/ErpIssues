import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanConfigConstants } from '../loan-config-constants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { ChargesTypesService } from './shared/charges-types.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';

@Component({
  selector: 'app-charges-types',
  templateUrl: './charges-types.component.html',
  styleUrls: ['./charges-types.component.css']
})
export class ChargesTypesComponent implements OnInit{
  loanchargestypes: any[] = [];
  msgs: any[] = [];
  responseModel!: Responsemodel;
  gridList: any[] = [];
  id :  any;
  displayDialog: boolean = false;
  deleteId: any;
  constructor(private router: Router,private chargesTypesService : ChargesTypesService,private encryptDecryptService: EncryptDecryptService,
    private commonComponent: CommonComponent,
  )
     {
      this.loanchargestypes = [
      { field: 'name', header: 'LOANS.NAME'},
      { field: 'description', header: 'LOANS.DESCRIPTION' },
      { field: 'statusName', header: 'LOANS.STATUS' },
      ];
   }
  ngOnInit() {
    this.getAll();
  }
  addData(){
    this.router.navigate([LoanConfigConstants.ADD_CHARGES_TYPE])
  }
  
  getAll(){
    this.chargesTypesService.getAllChargesTypes().subscribe((response: any) => {
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
    this.chargesTypesService.deleteChargesTypes(this.deleteId).subscribe(response => {
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
    this.router.navigate([LoanConfigConstants.ADD_CHARGES_TYPE], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } })
  }
}
