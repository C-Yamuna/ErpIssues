import { Component } from '@angular/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CashCountertransactionconstant } from '../../cash-counter-transaction-constant';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Branchtobranchtransaction } from '../shared/branchtobranchtransaction.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { BranchToBranchTransactionService } from '../shared/branch-to-branch-transaction.service';
import { DatePipe } from '@angular/common';
import { DenominationTypesService } from 'src/app/configurations/common-config/denomination-types/shared/denomination-types.service';

@Component({
  selector: 'app-add-branch-to-branch-transaction',
  templateUrl: './add-branch-to-branch-transaction.component.html',
  styleUrls: ['./add-branch-to-branch-transaction.component.css']
})
export class AddBranchToBranchTransactionComponent {
  branchtobranchtransactionform:FormGroup;
  statusList: any[] = [];
  branchtobranchtransactionModel: Branchtobranchtransaction = new Branchtobranchtransaction();
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
  branchToBranchTransactionDenominationDTOList:any[]=[];
  buttonDisabled?: any;
  products: any;
  amountValue:any;
  amountPisa:any;

  coinList:any[]=[];
  currencyList:any[]=[];
  DenominationList:any[] = [];

  constructor(private router:Router, private formBuilder:FormBuilder,
    private commonfunctionservice : CommonFunctionsService,private activateRoute: ActivatedRoute,
    private encryptService: EncryptDecryptService,private commonComponent: CommonComponent,private branchtobranchtransactionService: BranchToBranchTransactionService,
    private datePipe: DatePipe,private denominationService: DenominationTypesService,
  ){
    this.branchtobranchtransactionform = this.formBuilder.group({
      pacsId: new FormControl('',[Validators.required]),
      formBranchId: new FormControl('',[Validators.required]),
      toBranchId: new FormControl('',),
      date: new FormControl('',[Validators.required]),
      transactionType: new FormControl('',[Validators.required]),
      transactionAmount: new FormControl('',[Validators.required]),

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
        this.branchtobranchtransactionService.getBranchToBranchTransactionById(id).subscribe(res => {
          this.responseModel = res;
          // this.commonComponent.stopSpinner();
          if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
            this.branchtobranchtransactionModel = this.responseModel.data[0];
            if(this.branchtobranchtransactionModel.date != null && this.branchtobranchtransactionModel.date != undefined){
              this.branchtobranchtransactionModel.date=this.datePipe.transform(this.branchtobranchtransactionModel.date, this.orgnizationSetting.datePipe);
             
            }
          }
        });
      } else {
        this.isEdit = false;
        this.branchtobranchtransactionModel.status = this.statusList[0].value;
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
  this.router.navigate([CashCountertransactionconstant.BRANCH_TO_BRANCH_TRANSACTION]); 
}
addOrUpdate() {
  //this.commonComponent.startSpinner();
  if(this.branchtobranchtransactionModel.date != undefined && this.branchtobranchtransactionModel.date != null)
    this.branchtobranchtransactionModel.date = this.commonfunctionservice.getUTCEpoch(new Date(this.branchtobranchtransactionModel.date));
   
  
  if (this.isEdit) {
    this.branchtobranchtransactionService.updatBranchToBranchTransaction(this.branchtobranchtransactionModel).subscribe((response: any) => {
      this.responseModel = response;
      
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.branchtobranchtransactionModel = response.data[0];

        if(null != this.branchtobranchtransactionModel.date)
        this.branchtobranchtransactionModel.date=this.datePipe.transform(this.branchtobranchtransactionModel.date, this.orgnizationSetting.datePipe);
      
      
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
    this.branchtobranchtransactionService.addBranchToBranchTransaction(this.branchtobranchtransactionModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.branchtobranchtransactionModel = response.data[0];
     
        if(this.branchtobranchtransactionModel.date != null && this.branchtobranchtransactionModel.date != undefined ){
            this.branchtobranchtransactionModel.date=this.datePipe.transform(this.branchtobranchtransactionModel.date, this.orgnizationSetting.datePipe);
          
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
