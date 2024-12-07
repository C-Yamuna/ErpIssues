import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';

@Component({
  selector: 'app-agent-details-config',
  templateUrl: './agent-details-config.component.html',
  styleUrls: ['./agent-details-config.component.css']
})
export class AgentDetailsConfigComponent implements OnInit{
  
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
