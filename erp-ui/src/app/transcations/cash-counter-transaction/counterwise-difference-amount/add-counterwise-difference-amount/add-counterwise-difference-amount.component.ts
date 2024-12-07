import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CounterwiseDifferenceAmount } from '../shared/counterwise-difference-amount.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { DatePipe } from '@angular/common';
import { DenominationTypesService } from 'src/app/configurations/common-config/denomination-types/shared/denomination-types.service';
import { CounterwiseDifferenceAmountService } from '../shared/counterwise-difference-amount.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CashCountertransactionconstant } from '../../cash-counter-transaction-constant';
import { CashCounterService } from '../../shared/cash-counter.service';

@Component({
  selector: 'app-add-counterwise-difference-amount',
  templateUrl: './add-counterwise-difference-amount.component.html',
  styleUrls: ['./add-counterwise-difference-amount.component.css']
})
export class AddCounterwiseDifferenceAmountComponent {
  counterwisedifferenceamountform:FormGroup;
  statusList: any[] = [];
  counterwisedifferenceamountModel: CounterwiseDifferenceAmount = new CounterwiseDifferenceAmount();
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
  denominationListData:any[]=[];
  counterListData:any[]=[];

  constructor(private router:Router, private formBuilder:FormBuilder,
    private commonfunctionservice : CommonFunctionsService,private activateRoute: ActivatedRoute,
    private encryptService: EncryptDecryptService,private commonComponent: CommonComponent,
    private counterwiseDifferenceAmountService: CounterwiseDifferenceAmountService,
    private datePipe: DatePipe,private denominationService: DenominationTypesService,
    private cashcounterService: CashCounterService
  ){
    this.counterwisedifferenceamountform = this.formBuilder.group({
      counterId: new FormControl('',),
      date: new FormControl('',),
      denominationId: new FormControl('',),
      actualCount: new FormControl('',),
      differenceCount: new FormControl('',),
      differenceAmount: new FormControl('',),
      remarks: new FormControl('',),

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
        this.counterwiseDifferenceAmountService.getCounterwiseDifferenceAmountById(id).subscribe(res => {
          this.responseModel = res;
          // this.commonComponent.stopSpinner();
          if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
            this.counterwisedifferenceamountModel = this.responseModel.data[0];
            if(this.counterwisedifferenceamountModel.date != null && this.counterwisedifferenceamountModel.date != undefined){
              this.counterwisedifferenceamountModel.date=this.datePipe.transform(this.counterwisedifferenceamountModel.date, this.orgnizationSetting.datePipe);
             
            }
          }
        });
      } else {
        this.isEdit = false;
        this.counterwisedifferenceamountModel.status = this.statusList[0].value;
      }
    })
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.getAllDenomination();
    this.getAlldenominationlist();
    this.getAllcounters();
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
  this.router.navigate([CashCountertransactionconstant.COUNTERWISE_DIFFERENCE_AMOUNT]); 
}
addOrUpdate() {
  //this.commonComponent.startSpinner();
  if(this.counterwisedifferenceamountModel.date != undefined && this.counterwisedifferenceamountModel.date != null)
    this.counterwisedifferenceamountModel.date = this.commonfunctionservice.getUTCEpoch(new Date(this.counterwisedifferenceamountModel.date));
   
  
  if (this.isEdit) {
    this.counterwiseDifferenceAmountService.updateCounterwiseDifferenceAmount(this.counterwisedifferenceamountModel).subscribe((response: any) => {
      this.responseModel = response;
      
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.counterwisedifferenceamountModel = response.data[0];

        if(null != this.counterwisedifferenceamountModel.date)
        this.counterwisedifferenceamountModel.date=this.datePipe.transform(this.counterwisedifferenceamountModel.date, this.orgnizationSetting.datePipe);
      
      
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
    this.counterwiseDifferenceAmountService.addCounterwiseDifferenceAmount(this.counterwisedifferenceamountModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.counterwisedifferenceamountModel = response.data[0];
     
        if(this.counterwisedifferenceamountModel.date != null && this.counterwisedifferenceamountModel.date != undefined ){
            this.counterwisedifferenceamountModel.date=this.datePipe.transform(this.counterwisedifferenceamountModel.date, this.orgnizationSetting.datePipe);
          
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
getAlldenominationlist() {
  // this.commonComponent.startSpinner();
  this.denominationService.getAllDenomination().subscribe((data: any) => {
    this.responseModel = data;
    if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
      this.denominationListData = this.responseModel.data;
      this.denominationListData = this.denominationListData.filter((activity: any) => activity != null).map((act: { name: any; id: any; }) => {
        return { label: act.name, value: act.id };
      });
      //this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 1000);
    } else {
      // this.commonComponent.stopSpinner();
      this.msgs = [];
      this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
    }
  }, error => {
    //this.commonComponent.stopSpinner();
    this.msgs = [];
    this.msgs = [{ severity: "error", summary: 'Failed', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
  });
}
getAllcounters() {
  // this.commonComponent.startSpinner();
  this.cashcounterService.getAllashCounter().subscribe((data: any) => {
    this.responseModel = data;
    if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
      this.counterListData = this.responseModel.data;
      this.counterListData = this.counterListData.filter((activity: any) => activity != null).map((act: { name: any; id: any; }) => {
        return { label: act.name, value: act.id };
      });
      //this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 1000);
    } else {
      // this.commonComponent.stopSpinner();
      this.msgs = [];
      this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
    }
  }, error => {
    //this.commonComponent.stopSpinner();
    this.msgs = [];
    this.msgs = [{ severity: "error", summary: 'Failed', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
  });
}
}
