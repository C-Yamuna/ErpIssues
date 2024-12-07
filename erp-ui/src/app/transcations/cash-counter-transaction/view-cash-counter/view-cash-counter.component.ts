import { Component } from '@angular/core';
import { CashCountertransactionconstant } from '../cash-counter-transaction-constant';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { Cashcounter } from '../shared/cashcounter.model';
import { FormBuilder } from '@angular/forms';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CashCounterService } from '../shared/cash-counter.service';
import { DatePipe } from '@angular/common';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-view-cash-counter',
  templateUrl: './view-cash-counter.component.html',
  styleUrls: ['./view-cash-counter.component.css']
})
export class ViewCashCounterComponent {
  orgnizationSetting:any;
  cashcounterModel: Cashcounter = new Cashcounter();
  responseModel!: Responsemodel;
  msgs: any[] = [];
  isEdit: any;
  statusList: any[] = [];
  gridListData: any[] = [];
  constructor(private router:Router, private formBuilder:FormBuilder,
    private commonfunctionservice : CommonFunctionsService,private activateRoute: ActivatedRoute,
    private encryptService: EncryptDecryptService,private commonComponent: CommonComponent,private cashcounterService: CashCounterService,
    private datePipe: DatePipe,private translate: TranslateService
  ){
    
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
          this.cashcounterService.getashCounterById(id).subscribe(res => {
            this.responseModel = res;
            this.cashcounterModel = this.responseModel.data[0];
            this.cashcounterModel.effectiveStartDate = this.datePipe.transform(this.cashcounterModel.effectiveStartDate, 'dd/MM/yyyy');
            this.cashcounterModel.effectiveEndDate = this.datePipe.transform(this.cashcounterModel.effectiveEndDate, 'dd/MM/yyyy');
           
            this.commonComponent.stopSpinner();
            if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
              this.cashcounterModel = this.responseModel.data[0];
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
          this.cashcounterModel.status = this.statusList[0].value;
  
        }
      })
      
        this.getAll();
    }
  
  navigateToBack(){
    this.router.navigate([CashCountertransactionconstant.CASH_COUNTER]); 
  }
  getAll() {
    this.cashcounterService.getAllashCounter().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.gridListData = this.responseModel.data;
      } else {
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    });
  }
}
