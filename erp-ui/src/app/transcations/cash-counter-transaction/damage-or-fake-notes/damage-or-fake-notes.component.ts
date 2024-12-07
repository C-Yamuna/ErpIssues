import { Component } from '@angular/core';
import { CashCountertransactionconstant } from '../cash-counter-transaction-constant';
import { DamageOrFakeNotes } from './shared/damage-or-fake-notes.model';
import { MenuItem, SelectItem } from 'primeng/api';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { DatePipe } from '@angular/common';
import { DamageOrFakeNotesService } from './shared/damage-or-fake-notes.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-damage-or-fake-notes',
  templateUrl: './damage-or-fake-notes.component.html',
  styleUrls: ['./damage-or-fake-notes.component.css']
})
export class DamageOrFakeNotesComponent {
  columns: any[] = [];
  statuses!: SelectItem[];
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  responseModel!: Responsemodel;
  gridListData: any[] = [];
  value: number = 0;
  msgs: any[] = [];
  tempGridListData: any[] = [];
  gridListLenght: Number | undefined;
  showForm: boolean = false;
  pacsId : any;
  branchId : any;
  gridListLength: Number | undefined;
  damageorfakenotesModel: DamageOrFakeNotes = new DamageOrFakeNotes();
  orgnizationSetting: any;
  constructor(private router: Router,private translate: TranslateService,private commonFunctionsService: CommonFunctionsService,private datePipe: DatePipe,
    private encryptDecryptService: EncryptDecryptService, private damageOrFakeNotesService: DamageOrFakeNotesService,private commonComponent: CommonComponent
   )
  {
    this.columns = [
      { field: 'counterName', header: 'CASH_COUNTER_TRANSACTIONS.COUNTER' },
      { field: 'date', header: 'CASH_COUNTER_TRANSACTIONS.DATE' },
      { field: 'denominationName', header: 'CASH_COUNTER_TRANSACTIONS.DENOMINATIONS' },
      { field: 'count', header: 'CASH_COUNTER_TRANSACTIONS.COUNT' },
      { field: 'amount',header:'CASH_COUNTER_TRANSACTIONS.AMOUNT'},
      { field: 'remarks',header:'CASH_COUNTER_TRANSACTIONS.REMARKS'},
      { field: 'statusName', header: 'CASH_COUNTER_TRANSACTIONS.STATUS' },
    ];
   }
  ngOnInit() {
    this.commonFunctionsService.setStorageValue('language', 'en');
    this.commonFunctionsService.data.subscribe((res: any) => {
      if (res) {
        this.translate.use(res);
      } else {
        this.translate.use('en');
      }
    });
    let tabLabels = [
      'Yesterday Closing Balance',
      'Today Opening Balance',     
      'Total Damage Notes',
      'Total Damage Amount',
      'Total Fake Notes',
      'Total Fake Amount',             
    ];
    this.items = tabLabels.map((label, index)=> ({ label: label, value: `${index + 1}` }));
    //  tabLabels = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  
   this.orgnizationSetting = this.commonComponent.orgnizationSettings();
  this.getAll();
}
adddata(){
  this.router.navigate([CashCountertransactionconstant.ADD_DAMAGE_OR_FAKE_NOTES]);
}
viewData(rowData: any){
  this.router.navigate([CashCountertransactionconstant.VIEW_DAMAGE_OR_FAKE_NOTES],  { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
}
editdamageorfakenotes(rowData: any) {
  this.router.navigate([CashCountertransactionconstant.ADD_DAMAGE_OR_FAKE_NOTES], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
}


getAll() {
  this.damageOrFakeNotesService.getAllDamageOrFakeNotes().subscribe((data: any) => {
    this.responseModel = data;
    if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
      this.gridListData = this.responseModel.data.map((obj: { date: string | number | Date | null;  }) => {
      obj.date=this.datePipe.transform(obj.date, this.orgnizationSetting.datePipe);
     
      return obj;
      })
    } else {
      this.msgs = [];
      this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
    }
  });
}
onChange() {
  this.showForm = !this.showForm;
}
}
