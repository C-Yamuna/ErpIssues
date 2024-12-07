import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';

@Component({
  selector: 'app-loan-config',
  templateUrl: './loan-config.component.html',
  styleUrls: ['./loan-config.component.css']
})
export class LoanConfigComponent {
  constructor(private translate: TranslateService,private commonFunctionsService: CommonFunctionsService) {
  
  }
  ngOnInit(): void {
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
