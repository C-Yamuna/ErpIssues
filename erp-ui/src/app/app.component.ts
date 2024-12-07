import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonFunctionsService } from './shared/commonfunction.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'erp-ui';
  constructor(private translate: TranslateService, private commonFunctionsService: CommonFunctionsService) {
  
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
}
}
