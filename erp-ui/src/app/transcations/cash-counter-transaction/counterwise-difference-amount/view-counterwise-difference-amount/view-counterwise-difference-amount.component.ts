import { Component } from '@angular/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CashCountertransactionconstant } from '../../cash-counter-transaction-constant';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CounterwiseDifferenceAmountService } from '../shared/counterwise-difference-amount.service';
import { DenominationTypesService } from 'src/app/configurations/common-config/denomination-types/shared/denomination-types.service';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { FormBuilder } from '@angular/forms';
import { CounterwiseDifferenceAmount } from '../shared/counterwise-difference-amount.model';

@Component({
  selector: 'app-view-counterwise-difference-amount',
  templateUrl: './view-counterwise-difference-amount.component.html',
  styleUrls: ['./view-counterwise-difference-amount.component.css']
})
export class ViewCounterwiseDifferenceAmountComponent {
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
  counterwisedifferenceamountModel: CounterwiseDifferenceAmount = new CounterwiseDifferenceAmount();

constructor(private router:Router, private formBuilder:FormBuilder,
  private commonfunctionservice : CommonFunctionsService,private activateRoute: ActivatedRoute,
  private encryptService: EncryptDecryptService,private commonComponent: CommonComponent,
  private counterwiseDifferenceAmountService: CounterwiseDifferenceAmountService,
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
        this.counterwiseDifferenceAmountService.getCounterwiseDifferenceAmountById(id).subscribe(res => {
          this.responseModel = res;
          this.counterwisedifferenceamountModel = this.responseModel.data[0];
          this.counterwisedifferenceamountModel.date = this.datePipe.transform(this.counterwisedifferenceamountModel.date, 'dd/MM/yyyy');
          
         
          this.commonComponent.stopSpinner();
          if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
            this.counterwisedifferenceamountModel = this.responseModel.data[0];
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
        this.counterwisedifferenceamountModel.status = this.statusList[0].value;

      }
    })
    
      this.getAll();
      this.getAllDenomination();
    }
  
    navigateToBack(){
    this.router.navigate([CashCountertransactionconstant.COUNTERWISE_DIFFERENCE_AMOUNT]); 
  }
  getAll() {
    this.counterwiseDifferenceAmountService.getAllCounterwiseDifferenceAmount().subscribe((data: any) => {
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
