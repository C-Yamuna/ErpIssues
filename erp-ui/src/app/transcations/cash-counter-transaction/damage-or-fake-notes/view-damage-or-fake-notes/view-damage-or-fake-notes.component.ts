import { Component } from '@angular/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CashCountertransactionconstant } from '../../cash-counter-transaction-constant';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { DamageOrFakeNotes } from '../shared/damage-or-fake-notes.model';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { DamageOrFakeNotesService } from '../shared/damage-or-fake-notes.service';
import { DatePipe } from '@angular/common';
import { DenominationTypesService } from 'src/app/configurations/common-config/denomination-types/shared/denomination-types.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-view-damage-or-fake-notes',
  templateUrl: './view-damage-or-fake-notes.component.html',
  styleUrls: ['./view-damage-or-fake-notes.component.css']
})
export class ViewDamageOrFakeNotesComponent {
  orgnizationSetting:any;
  responseModel!: Responsemodel;
  msgs: any[] = [];
  isEdit: any;
  statusList: any[] = [];
  gridListData: any[] = [];
  columns: any[] = [];
  subColumns:any[]=[];
  coinList:any[]=[];
  currencyList:any[]=[];
  DenominationList:any[]=[];
  damageorfakenotesModel: DamageOrFakeNotes = new DamageOrFakeNotes();

constructor(private router:Router, private formBuilder:FormBuilder,
  private commonfunctionservice : CommonFunctionsService,private activateRoute: ActivatedRoute,
  private encryptService: EncryptDecryptService,private commonComponent: CommonComponent,
  private damageOrFakeNotesService: DamageOrFakeNotesService,
  private datePipe: DatePipe,private denominationService: DenominationTypesService,private translate: TranslateService
){
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
    this.commonfunctionservice.setStorageValue('language', 'en');
    this.commonfunctionservice.data.subscribe((res: any) => {
      if (res) {
        this.translate.use(res);
      } else {
        this.translate.use('en');
      }
    });
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let id = this.encryptService.decrypt(params['id']);
        this.isEdit = true;
        this.damageOrFakeNotesService.getDamageOrFakeNotesById(id).subscribe(res => {
          this.responseModel = res;
          this.damageorfakenotesModel = this.responseModel.data[0];
          this.damageorfakenotesModel.date = this.datePipe.transform(this.damageorfakenotesModel.date, 'dd/MM/yyyy');
          
         
          this.commonComponent.stopSpinner();
          if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
            this.damageorfakenotesModel = this.responseModel.data[0];
          }
          else {
            this.msgs = [];
            this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];
              this.navigateToBack();
            }, 2000);
          }
        });
      } else {
        //this.commonComponent.stopSpinner();
        this.isEdit = false;
        this.damageorfakenotesModel.status = this.statusList[0].value;

      }
    })
    
      this.getAll();
      this.getAllDenomination();
    }
  
    navigateToBack(){
    this.router.navigate([CashCountertransactionconstant.DAMAGE_OR_FAKE_NOTES]); 
  }
  getAll() {
    this.damageOrFakeNotesService.getAllDamageOrFakeNotes().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.gridListData = this.responseModel.data;
      } else {
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    });
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
  
}
