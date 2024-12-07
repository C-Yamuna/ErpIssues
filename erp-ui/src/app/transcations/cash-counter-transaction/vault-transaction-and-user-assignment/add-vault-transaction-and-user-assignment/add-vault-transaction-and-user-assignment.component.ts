import { Component } from '@angular/core';
import { CashCountertransactionconstant } from '../../cash-counter-transaction-constant';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { DatePipe } from '@angular/common';
import { CommonComponent } from 'src/app/shared/common.component';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { VaultVaultTransactionAndUserAssignment } from '../shared/vault-vault-transaction-and-user-assignment.model';
import { VaultTransactionAndUserAssignmentService } from '../shared/vault-transaction-and-user-assignment.service';
import { DenominationTypesService } from 'src/app/configurations/common-config/denomination-types/shared/denomination-types.service';

@Component({
  selector: 'app-add-vault-transaction-and-user-assignment',
  templateUrl: './add-vault-transaction-and-user-assignment.component.html',
  styleUrls: ['./add-vault-transaction-and-user-assignment.component.css']
})
export class AddVaultTransactionAndUserAssignmentComponent {
  vaulttransactionanduserassignmentform:FormGroup;
  statusList: any[] = [];
  vaulttransactionanduserassignmentModel: VaultVaultTransactionAndUserAssignment = new VaultVaultTransactionAndUserAssignment();
  responseModel!: Responsemodel;
  msgs: any[] = [];
  isEdit: any;
  orgnizationSetting:any;
  maxDate = new Date();
  columns: any[] = [];
  gridListData: any[] = [];
  tableData: any[] = [];
  rowData:any;


  subColumns:any[]=[];
  DenominationList:any[]=[];
  buttonDisabled?: any;
  products: any;
  amountValue:any;
  amountPisa:any;

  coinList:any[]=[];
  currencyList:any[]=[];


  constructor(private router:Router, private formBuilder:FormBuilder,
    private commonfunctionservice : CommonFunctionsService,private activateRoute: ActivatedRoute,
    private encryptService: EncryptDecryptService,private commonComponent: CommonComponent,private vaulttransactionService: VaultTransactionAndUserAssignmentService,
    private datePipe: DatePipe,private denominationService: DenominationTypesService,
  ){
    this.vaulttransactionanduserassignmentform = this.formBuilder.group({
      counterName: new FormControl('',),
      vaultName: new FormControl('',),
      date: new FormControl('',),
      transactionType: new FormControl('',),
      transactionAmount: new FormControl('',),
   

})

this.columns = [
  { field: 'notes', header: 'CASH_COUNTER_TRANSACTIONS.NOTES' },
  { field: '', header: 'CASH_COUNTER_TRANSACTIONS.COUNT' },
  { field: '', header: 'CASH_COUNTER_TRANSACTIONS.AMOUNTS' },
 
];
this.subColumns = [
  { field: 'coins', header: 'CASH_COUNTER_TRANSACTIONS.NOTES' },
  { field: '', header: 'CASH_COUNTER_TRANSACTIONS.COUNT' },
  { field: '', header: 'CASH_COUNTER_TRANSACTIONS.AMOUNTS' },
];


}
ngOnInit(): void {
  this.statusList = this.commonComponent.status();
  this.orgnizationSetting = this.commonComponent.orgnizationSettings()
  
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        // this.commonComponent.startSpinner();
        let id = this.encryptService.decrypt(params['id']);
        this.isEdit = true;
        this.vaulttransactionService.getVaultTransactionAndUserAssignmentById(id).subscribe(res => {
          this.responseModel = res;
          // this.commonComponent.stopSpinner();
          if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
            this.vaulttransactionanduserassignmentModel = this.responseModel.data[0];
            if(this.vaulttransactionanduserassignmentModel.date != null && this.vaulttransactionanduserassignmentModel.date != undefined){
              this.vaulttransactionanduserassignmentModel.date=this.datePipe.transform(this.vaulttransactionanduserassignmentModel.date, this.orgnizationSetting.datePipe);
             
            }
          }
        });
      } else {
        this.isEdit = false;
        this.vaulttransactionanduserassignmentModel.status = this.statusList[0].value;
      }
    })
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
     this.getAllDenomination();
}
getAllDenomination() {
    this.commonComponent.startSpinner();
    this.denominationService.getAllDenomination().subscribe((data: any) => {
      this.responseModel = data;
      this.DenominationList = this.responseModel.data;
      for(let obj of this.DenominationList){
        if(obj.isCoin){
          this.coinList.push(obj)
        }
        else{
          this.currencyList.push(obj)
        }
      }
      this.commonComponent.stopSpinner();
    },
      error => {
        this.msgs = [];
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
      });
  }
  

addOrUpdate() {
  //this.commonComponent.startSpinner();
  if(this.vaulttransactionanduserassignmentModel.date != undefined && this.vaulttransactionanduserassignmentModel.date != null)
    this.vaulttransactionanduserassignmentModel.date = this.commonfunctionservice.getUTCEpoch(new Date(this.vaulttransactionanduserassignmentModel.date));
   
  
  if (this.isEdit) {
    this.vaulttransactionService.updatVaultTransactionAndUserAssignment(this.vaulttransactionanduserassignmentModel).subscribe((response: any) => {
      this.responseModel = response;
      
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.vaulttransactionanduserassignmentModel = response.data[0];

        if(null != this.vaulttransactionanduserassignmentModel.date)
        this.vaulttransactionanduserassignmentModel.date=this.datePipe.transform(this.vaulttransactionanduserassignmentModel.date, this.orgnizationSetting.datePipe);
      
      
        //this.commonComponent.stopSpinner();
        this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
          this.navigateToBack();
        }, 1000);
      } else {
       // this.commonComponent.stopSpinner();
        this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
        }, 1000);
      }
    },
      error => {
        //this.commonComponent.stopSpinner();
        this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
        }, 1000);
      });
  } else {
    this.vaulttransactionService.addVaultTransactionAndUserAssignment(this.vaulttransactionanduserassignmentModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.vaulttransactionanduserassignmentModel = response.data[0];
     
        if(this.vaulttransactionanduserassignmentModel.date != null && this.vaulttransactionanduserassignmentModel.date != undefined ){
            this.vaulttransactionanduserassignmentModel.date=this.datePipe.transform(this.vaulttransactionanduserassignmentModel.date, this.orgnizationSetting.datePipe);
          
          }
        // this.commonComponent.stopSpinner();
        this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
          this.navigateToBack();
        }, 1000);
      } else {
        //this.commonComponent.stopSpinner();
        this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
        }, 1000);
      }
    },
      error => {
        // this.commonComponent.stopSpinner();
        this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
        }, 1000);
      });
  }
}

navigateToBack(){
  this.router.navigate([CashCountertransactionconstant.VAULT_TRANSACTION_AND_USER_ASSIGNMENT]); 
}

}
