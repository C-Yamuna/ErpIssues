import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CashCountertransactionconstant } from '../../cash-counter-transaction-constant';
import { Branchtobranchtransaction } from '../shared/branchtobranchtransaction.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { BranchToBranchTransactionService } from '../shared/branch-to-branch-transaction.service';
import { DenominationTypesService } from 'src/app/configurations/common-config/denomination-types/shared/denomination-types.service';

@Component({
  selector: 'app-view-branch-to-branch-transaction',
  templateUrl: './view-branch-to-branch-transaction.component.html',
  styleUrls: ['./view-branch-to-branch-transaction.component.css']
})
export class ViewBranchToBranchTransactionComponent {
 

  orgnizationSetting:any;
  branchtobranchtransactionModel: Branchtobranchtransaction = new Branchtobranchtransaction();
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
  constructor(private router:Router, private formBuilder:FormBuilder,
    private commonfunctionservice : CommonFunctionsService,private activateRoute: ActivatedRoute,
    private encryptService: EncryptDecryptService,private commonComponent: CommonComponent,private branchtobranchtransactionService: BranchToBranchTransactionService,
    private datePipe: DatePipe,private translate: TranslateService,private denominationService: DenominationTypesService,
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
          this.branchtobranchtransactionService.getBranchToBranchTransactionById(id).subscribe(res => {
            this.responseModel = res;
            this.branchtobranchtransactionModel = this.responseModel.data[0];
            this.branchtobranchtransactionModel.date = this.datePipe.transform(this.branchtobranchtransactionModel.date, 'dd/MM/yyyy');
           
           
            this.commonComponent.stopSpinner();
            if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
              this.branchtobranchtransactionModel = this.responseModel.data[0];
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
          this.branchtobranchtransactionModel.status = this.statusList[0].value;
  
        }
      })
      
        this.getAll();
        this.getAllDenomination();
    }
  
  navigateToBack(){
    this.router.navigate([CashCountertransactionconstant.BRANCH_TO_BRANCH_TRANSACTION]); 
  }
  getAll() {
    this.branchtobranchtransactionService.getAllBranchToBranchTransaction().subscribe((data: any) => {
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