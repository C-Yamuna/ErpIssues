import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Loantransactionconstant } from '../../loan-transaction-constant';
import { SaoDisbursementService } from '../../shared/sao-loans/sao-disbursement.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { Disbursement } from './shared/disbursement.model';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';


@Component({
  selector: 'app-disbursement',
  templateUrl: './disbursement.component.html',
  styleUrls: ['./disbursement.component.css']
})
export class DisbursementComponent {
  loanDisubursementForm: FormGroup;
  showTable: boolean = true;
  showSaveButton: boolean = false;
  showSubmitButton: boolean = true;
  disbursement: any[] = [];
  visible: boolean = false;
  responseModel!: Responsemodel;
  gridList: any[] = [];
  isEdit: any;
  msgs: any[] = [];
  disbursementModel: Disbursement = new Disbursement();
  loanId: any;
  constructor(private router: Router, private formBuilder: FormBuilder, private saoDisbursementService :SaoDisbursementService,
    private encryptService: EncryptDecryptService,private commonComponent: CommonComponent,private activateRoute: ActivatedRoute
  )
  { 
    this.loanDisubursementForm = this.formBuilder.group({
     
    })
  }

  ngOnInit() {
  this.disbursement = [
    { field: 'Units',header:'UNITS'},
    { field: 'disbursementAmount', header: 'DISBURSEMENT AMOUNT' },
    { field: 'accountNumber', header: 'ACCOUNT NUMBER' },
    { field: 'disbursementDate', header: 'DISBURSEMENT DATE' },
    { field: 'transactionDate', header: 'TRANSACTION DATE ' },
    { field: 'statusName',header:'STATUS'},
    //{ field: 'Action', header: 'ACTION' },
   
  ];
  this.activateRoute.queryParams.subscribe(params => {
    if (params['id'] != undefined) {
      // this.commonComponent.startSpinner();
      let id = this.encryptService.decrypt(params['id']);
      this.isEdit = true;
      this.saoDisbursementService.getSaoDisbursementById(id).subscribe(res => {
        this.responseModel = res;
        // this.commonComponent.stopSpinner();
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          this.disbursementModel = this.responseModel.data[0];
        }
       this.getSaoDisbursmentDetailsByLoanApplicationId(id);

      });
    } else {
      this.isEdit = false;
      // this.pacsdetailsModel.status = this.statusList[0].value;
    }
  })
  this.getAll();
  
  }
  getAll(){
    this.saoDisbursementService.getAllSaoDisbursement().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.gridList = this.responseModel.data;
        this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
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
  back(){
    this.router.navigate([Loantransactionconstant.SAO_LOAN]);
  }

edit(){
  this.showTable = false;
  this.showSaveButton= true;
  this.showSubmitButton = false;
  
}
editDisbursmentDetailsRow(row:any){
  this.disbursementModel = row;
  this.disbursementModel.saoLoanApplicationId = this.loanId;
  this.saoDisbursementService.getSaoDisbursementById(this.disbursementModel.id).subscribe((response : any ) => {
    this.responseModel = response;
    if(this.responseModel.status == applicationConstants.STATUS_SUCCESS){
      this.disbursementModel = this.responseModel.data;
    }
   // this.addButton = false;
   this.getSaoDisbursmentDetailsByLoanApplicationId(this.responseModel.data[0].saoLoanApplicationId);
});
}
cancelDisbursmentDetails() {
  this.gridList = [];
 // this.addButton = false;
  this.getSaoDisbursmentDetailsByLoanApplicationId(this.loanId);      
}
getSaoDisbursmentDetailsByLoanApplicationId(loanId:any) {
  this.saoDisbursementService.getSaoDisbursmentDetailsByLoanApplicationId(loanId).subscribe(res => {
    this.responseModel = res;
    this.commonComponent.stopSpinner();
    if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
      this.gridList = this.responseModel.data;
      this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    } else {
      this.commonComponent.stopSpinner();
     // this.buttonDisabled = applicationConstants.FALSE;
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    }
  });
}
view(){

}
cancel(){
  this.router.navigate([Loantransactionconstant.SAO_LOAN]);
}
submit(){
  this.showTable = true;
}

save(){
  this.showTable = true;
  this.showSubmitButton = true;
  this.showSaveButton= false;
}
showDialog() {
  this.visible = true;
}
confirm(){
  this.router.navigate([Loantransactionconstant.LOANS_TRANSACTION]);
}

}
