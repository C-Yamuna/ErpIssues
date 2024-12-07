import { Component } from '@angular/core';
import { VaultToDccbTransaction } from '../shared/vault-to-dccb-transaction.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { DenominationTypesService } from 'src/app/configurations/common-config/denomination-types/shared/denomination-types.service';
import { DatePipe } from '@angular/common';
import { VaultToDccbTransactionService } from '../shared/vault-to-dccb-transaction.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CashCountertransactionconstant } from '../../cash-counter-transaction-constant';

@Component({
  selector: 'app-add-vault-to-dccb-transaction',
  templateUrl: './add-vault-to-dccb-transaction.component.html',
  styleUrls: ['./add-vault-to-dccb-transaction.component.css']
})
export class AddVaultToDccbTransactionComponent {
  vaulttodccbtransactionform:FormGroup;
  statusList: any[] = [];
  vaulttodccbtransactionModel: VaultToDccbTransaction = new VaultToDccbTransaction();
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
  buttonDisabled?: any;
  products: any;
  amountValue:any;
  amountPisa:any;

  coinList:any[]=[];
  currencyList:any[]=[];
  DenominationList:any[] = [];

  constructor(private router:Router, private formBuilder:FormBuilder,
    private commonfunctionservice : CommonFunctionsService,private activateRoute: ActivatedRoute,
    private encryptService: EncryptDecryptService,private commonComponent: CommonComponent,
    private vaultToDccbTransactionService: VaultToDccbTransactionService,
    private datePipe: DatePipe,private denominationService: DenominationTypesService,
  ){
    this.vaulttodccbtransactionform = this.formBuilder.group({
      dccbAccountNumber: new FormControl('',),
      adviceCopyPath: new FormControl('',),
      transactionType: new FormControl('',),
      date: new FormControl('',),
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
        this.vaultToDccbTransactionService.getVaultToDccbTransactionById(id).subscribe(res => {
          this.responseModel = res;
          // this.commonComponent.stopSpinner();
          if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
            this.vaulttodccbtransactionModel = this.responseModel.data[0];
            if(this.vaulttodccbtransactionModel.date != null && this.vaulttodccbtransactionModel.date != undefined){
              this.vaulttodccbtransactionModel.date=this.datePipe.transform(this.vaulttodccbtransactionModel.date, this.orgnizationSetting.datePipe);
             
            }
          }
        });
      } else {
        this.isEdit = false;
        this.vaulttodccbtransactionModel.status = this.statusList[0].value;
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
navigateToBack(){
  this.router.navigate([CashCountertransactionconstant.VAULT_TO_DCCB_TRANSACTION]); 
}
addOrUpdate() {
  //this.commonComponent.startSpinner();
  if(this.vaulttodccbtransactionModel.date != undefined && this.vaulttodccbtransactionModel.date != null)
    this.vaulttodccbtransactionModel.date = this.commonfunctionservice.getUTCEpoch(new Date(this.vaulttodccbtransactionModel.date));
   
  
  if (this.isEdit) {
    this.vaultToDccbTransactionService.updatVaultToDccbTransaction(this.vaulttodccbtransactionModel).subscribe((response: any) => {
      this.responseModel = response;
      
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.vaulttodccbtransactionModel = response.data[0];

        if(null != this.vaulttodccbtransactionModel.date)
        this.vaulttodccbtransactionModel.date=this.datePipe.transform(this.vaulttodccbtransactionModel.date, this.orgnizationSetting.datePipe);
      
      
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
    this.vaultToDccbTransactionService.addVaultToDccbTransaction(this.vaulttodccbtransactionModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.vaulttodccbtransactionModel = response.data[0];
     
        if(this.vaulttodccbtransactionModel.date != null && this.vaulttodccbtransactionModel.date != undefined ){
            this.vaulttodccbtransactionModel.date=this.datePipe.transform(this.vaulttodccbtransactionModel.date, this.orgnizationSetting.datePipe);
          
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
}
