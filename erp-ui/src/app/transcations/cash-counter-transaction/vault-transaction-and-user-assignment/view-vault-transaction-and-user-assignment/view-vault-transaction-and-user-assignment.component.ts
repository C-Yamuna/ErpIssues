import { Component } from '@angular/core';
import { CashCountertransactionconstant } from '../../cash-counter-transaction-constant';
import { FormBuilder } from '@angular/forms';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { DatePipe } from '@angular/common';
import { CommonComponent } from 'src/app/shared/common.component';
import { TranslateService } from '@ngx-translate/core';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { VaultVaultTransactionAndUserAssignment } from '../shared/vault-vault-transaction-and-user-assignment.model';
import { DenominationTypesService } from 'src/app/configurations/common-config/denomination-types/shared/denomination-types.service';
import { VaultTransactionAndUserAssignmentService } from '../shared/vault-transaction-and-user-assignment.service';

@Component({
  selector: 'app-view-vault-transaction-and-user-assignment',
  templateUrl: './view-vault-transaction-and-user-assignment.component.html',
  styleUrls: ['./view-vault-transaction-and-user-assignment.component.css']
})
export class ViewVaultTransactionAndUserAssignmentComponent {
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
  vaulttransactionanduserassignmentModel: VaultVaultTransactionAndUserAssignment = new VaultVaultTransactionAndUserAssignment();

constructor(private router:Router, private formBuilder:FormBuilder,
  private commonfunctionservice : CommonFunctionsService,private activateRoute: ActivatedRoute,
  private encryptService: EncryptDecryptService,private commonComponent: CommonComponent,private vaulttransactionService: VaultTransactionAndUserAssignmentService,
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
        this.vaulttransactionService.getVaultTransactionAndUserAssignmentById(id).subscribe(res => {
          this.responseModel = res;
          this.vaulttransactionanduserassignmentModel = this.responseModel.data[0];
          this.vaulttransactionanduserassignmentModel.date = this.datePipe.transform(this.vaulttransactionanduserassignmentModel.date, 'dd/MM/yyyy');
          
         
          this.commonComponent.stopSpinner();
          if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
            this.vaulttransactionanduserassignmentModel = this.responseModel.data[0];
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
        this.vaulttransactionanduserassignmentModel.status = this.statusList[0].value;

      }
    })
    
      this.getAll();
      this.getAllDenomination();
    }
  
    navigateToBack(){
    this.router.navigate([CashCountertransactionconstant.VAULT_TRANSACTION_AND_USER_ASSIGNMENT]); 
  }
  getAll() {
    this.vaulttransactionService.getAllVaultTransactionAndUserAssignment().subscribe((data: any) => {
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




