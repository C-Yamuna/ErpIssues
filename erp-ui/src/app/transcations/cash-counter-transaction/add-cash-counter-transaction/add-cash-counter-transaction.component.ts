import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { Cashcounter } from '../shared/cashcounter.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { CashCounterService } from '../shared/cash-counter.service';
import { DatePipe } from '@angular/common';
import { CashCountertransactionconstant } from '../cash-counter-transaction-constant';

@Component({
  selector: 'app-add-cash-counter-transaction',
  templateUrl: './add-cash-counter-transaction.component.html',
  styleUrls: ['./add-cash-counter-transaction.component.css']
})
export class AddCashCounterTransactionComponent {
  cashcounterform:FormGroup;
  statusList: any[] = [];
  cashcounterModel: Cashcounter = new Cashcounter();
  responseModel!: Responsemodel;
  msgs: any[] = [];
  isEdit: any;
  orgnizationSetting:any;
  maxDate = new Date();

  constructor(private router:Router, private formBuilder:FormBuilder,
    private commonfunctionservice : CommonFunctionsService,private activateRoute: ActivatedRoute,
    private encryptService: EncryptDecryptService,private commonComponent: CommonComponent,private cashcounterService: CashCounterService,
    private datePipe: DatePipe,
  ){
    this.cashcounterform = this.formBuilder.group({
      pacsId: new FormControl('',[Validators.required]),
      branchId: new FormControl('',[Validators.required]),
      counterName: new FormControl('',),
      effectiveStartDate: new FormControl('',[Validators.required]),
      effectiveEndDate: new FormControl('',[Validators.required]),

})
}
ngOnInit(): void {
  this.statusList = this.commonComponent.status();
  this.orgnizationSetting = this.commonComponent.orgnizationSettings()
  
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        // this.commonComponent.startSpinner();
        let id = this.encryptService.decrypt(params['id']);
        this.isEdit = true;
        this.cashcounterService.getashCounterById(id).subscribe(res => {
          this.responseModel = res;
          // this.commonComponent.stopSpinner();
          if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
            this.cashcounterModel = this.responseModel.data[0];
            if(this.cashcounterModel.effectiveStartDate != null && this.cashcounterModel.effectiveStartDate != undefined &&this.cashcounterModel.effectiveEndDate!=null&&this.cashcounterModel.effectiveEndDate!= undefined){
              this.cashcounterModel.effectiveStartDate=this.datePipe.transform(this.cashcounterModel.effectiveStartDate, this.orgnizationSetting.datePipe);
              this.cashcounterModel.effectiveEndDate=this.datePipe.transform(this.cashcounterModel.effectiveEndDate, this.orgnizationSetting.datePipe);
            }
          }
        });
      } else {
        this.isEdit = false;
        this.cashcounterModel.status = this.statusList[0].value;
      }
    })
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
}
navigateToBack(){
  this.router.navigate([CashCountertransactionconstant.CASH_COUNTER]); 
}
addOrUpdate() {
  //this.commonComponent.startSpinner();
  if(this.cashcounterModel.effectiveStartDate != undefined && this.cashcounterModel.effectiveStartDate != null)
    this.cashcounterModel.effectiveStartDate = this.commonfunctionservice.getUTCEpoch(new Date(this.cashcounterModel.effectiveStartDate));
    if(this.cashcounterModel.effectiveEndDate != undefined && this.cashcounterModel.effectiveEndDate != null)
    this.cashcounterModel.effectiveEndDate = this.commonfunctionservice.getUTCEpoch(new Date(this.cashcounterModel.effectiveEndDate));
  if (this.isEdit) {
    this.cashcounterService.updateashCounter(this.cashcounterModel).subscribe((response: any) => {
      this.responseModel = response;
      
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.cashcounterModel = response.data[0];

        if(null != this.cashcounterModel.effectiveStartDate)
        this.cashcounterModel.effectiveStartDate=this.datePipe.transform(this.cashcounterModel.effectiveStartDate, this.orgnizationSetting.datePipe);
        if(null != this.cashcounterModel.effectiveEndDate)
        this.cashcounterModel.effectiveEndDate=this.datePipe.transform(this.cashcounterModel.effectiveEndDate, this.orgnizationSetting.datePipe);
      
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
    this.cashcounterService.addashCounter(this.cashcounterModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.cashcounterModel = response.data[0];
     
        if(this.cashcounterModel.effectiveStartDate != null && this.cashcounterModel.effectiveStartDate != undefined &&this.cashcounterModel.effectiveEndDate!=null&&this.cashcounterModel.effectiveEndDate!= undefined){
            this.cashcounterModel.effectiveStartDate=this.datePipe.transform(this.cashcounterModel.effectiveStartDate, this.orgnizationSetting.datePipe);
            this.cashcounterModel.effectiveEndDate=this.datePipe.transform(this.cashcounterModel.effectiveEndDate, this.orgnizationSetting.datePipe);
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
