import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { DamageOrFakeNotes } from '../shared/damage-or-fake-notes.model';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { DamageOrFakeNotesService } from '../shared/damage-or-fake-notes.service';
import { DenominationTypesService } from 'src/app/configurations/common-config/denomination-types/shared/denomination-types.service';
import { DatePipe } from '@angular/common';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CashCountertransactionconstant } from '../../cash-counter-transaction-constant';

@Component({
  selector: 'app-add-damage-or-fake-notes',
  templateUrl: './add-damage-or-fake-notes.component.html',
  styleUrls: ['./add-damage-or-fake-notes.component.css']
})
export class AddDamageOrFakeNotesComponent {
  damageorfakenotesform:FormGroup;
  statusList: any[] = [];
  damageorfakenotesModel: DamageOrFakeNotes = new DamageOrFakeNotes();
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


  constructor(private router:Router, private formBuilder:FormBuilder,
    private commonfunctionservice : CommonFunctionsService,private activateRoute: ActivatedRoute,
    private encryptService: EncryptDecryptService,private commonComponent: CommonComponent,
    private damageOrFakeNotesService: DamageOrFakeNotesService,
    private datePipe: DatePipe,private denominationService: DenominationTypesService,
   
  ){
    this.damageorfakenotesform = this.formBuilder.group({
      counterId: new FormControl('',),
      date: new FormControl('',),
      denominationId: new FormControl('',),
      count: new FormControl('',),
      amount: new FormControl('',),
   
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
        this.damageOrFakeNotesService.getDamageOrFakeNotesById(id).subscribe(res => {
          this.responseModel = res;
          // this.commonComponent.stopSpinner();
          if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
            this.damageorfakenotesModel = this.responseModel.data[0];
            if(this.damageorfakenotesModel.date != null && this.damageorfakenotesModel.date != undefined){
              this.damageorfakenotesModel.date=this.datePipe.transform(this.damageorfakenotesModel.date, this.orgnizationSetting.datePipe);
             
            }
          }
        });
      } else {
        this.isEdit = false;
        this.damageorfakenotesModel.status = this.statusList[0].value;
      }
    })
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.getAllDenomination();
    this.getAlldenominationlist();

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
  this.router.navigate([CashCountertransactionconstant.DAMAGE_OR_FAKE_NOTES]); 
}
addOrUpdate() {
  //this.commonComponent.startSpinner();
  if(this.damageorfakenotesModel.date != undefined && this.damageorfakenotesModel.date != null)
    this.damageorfakenotesModel.date = this.commonfunctionservice.getUTCEpoch(new Date(this.damageorfakenotesModel.date));
   
  
  if (this.isEdit) {
    this.damageOrFakeNotesService.updateDamageOrFakeNotes(this.damageorfakenotesModel).subscribe((response: any) => {
      this.responseModel = response;
      
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.damageorfakenotesModel = response.data[0];

        if(null != this.damageorfakenotesModel.date)
        this.damageorfakenotesModel.date=this.datePipe.transform(this.damageorfakenotesModel.date, this.orgnizationSetting.datePipe);
      
      
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
    this.damageOrFakeNotesService.addDamageOrFakeNotes(this.damageorfakenotesModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.damageorfakenotesModel = response.data[0];
     
        if(this.damageorfakenotesModel.date != null && this.damageorfakenotesModel.date != undefined ){
            this.damageorfakenotesModel.date=this.datePipe.transform(this.damageorfakenotesModel.date, this.orgnizationSetting.datePipe);
          
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

}
