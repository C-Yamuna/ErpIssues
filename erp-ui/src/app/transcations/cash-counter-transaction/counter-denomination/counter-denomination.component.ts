import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CounterDenomination } from './shared/counter-denomination.model';
import { TranslateService } from '@ngx-translate/core';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { MenuItem, SelectItem } from 'primeng/api';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { DatePipe } from '@angular/common';
import { CounterDenominationService } from './shared/counter-denomination.service';

@Component({
  selector: 'app-counter-denomination',
  templateUrl: './counter-denomination.component.html',
  styleUrls: ['./counter-denomination.component.css']
})
export class CounterDenominationComponent {
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

  pacsId : any;
  branchId : any;
  gridListLength: Number | undefined;
  counterdenominationModel: CounterDenomination = new CounterDenomination();
  orgnizationSetting: any;
  showForm: boolean = false;

  constructor(private router: Router,private translate: TranslateService,private commonFunctionsService: CommonFunctionsService,private datePipe: DatePipe,
    private encryptDecryptService: EncryptDecryptService, private counterDenominationService: CounterDenominationService,private commonComponent: CommonComponent
   )
  {
    this.columns = [
      { field: 'counterName', header: 'CASH_COUNTER_TRANSACTIONS.COUNTER_NAME' },
      { field: 'date', header: 'CASH_COUNTER_TRANSACTIONS.DATE' },
      { field: 'denominationName', header: 'CASH_COUNTER_TRANSACTIONS.DENOMINATIONS' },
      { field: 'count', header: 'CASH_COUNTER_TRANSACTIONS.COUNT' },
      { field: 'amount',header:'CASH_COUNTER_TRANSACTIONS.AMOUNT'},
      { field: 'bundleCount',header:'CASH_COUNTER_TRANSACTIONS.BUNDLE_COUNT'},
      { field: 'sectionsCount',header:'CASH_COUNTER_TRANSACTIONS.SECTION_COUNT'},
      { field: 'looseCashCount', header: 'CASH_COUNTER_TRANSACTIONS.LOOSE_CASH' },
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
      'Total Amount',    
      'Total Bundles',
      'Total Sections',
      'Total Loose Cash Count',          
    ];
    this.items = tabLabels.map((label, index)=> ({ label: label, value: `${index + 1}` }));
    //  tabLabels = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  
   this.orgnizationSetting = this.commonComponent.orgnizationSettings();
  this.getAll();
}




getAll() {
  this.counterDenominationService.getAllCounterDenomination().subscribe((data: any) => {
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
