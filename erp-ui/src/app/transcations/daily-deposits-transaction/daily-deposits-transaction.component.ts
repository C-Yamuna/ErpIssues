import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';

@Component({
  selector: 'app-daily-deposits-transaction',
  templateUrl: './daily-deposits-transaction.component.html',
  styleUrls: ['./daily-deposits-transaction.component.css']
})
export class DailyDepositsTransactionComponent {
  constructor(private router: Router,private translate: TranslateService,private commonFunctionsService: CommonFunctionsService
    , private encryptDecryptService: EncryptDecryptService,private datePipe: DatePipe,
    private commonComponent: CommonComponent)
  {}
  ngOnInit() {
    this.commonFunctionsService.setStorageValue('language', 'en');
    this.commonFunctionsService.data.subscribe((res: any) => {
      if (res) {
        this.translate.use(res);
      } else {
        this.translate.use('en');
      }
    });
}
}
