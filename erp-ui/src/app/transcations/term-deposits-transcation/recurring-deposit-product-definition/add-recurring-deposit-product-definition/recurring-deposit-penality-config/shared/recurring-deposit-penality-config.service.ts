import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class RecurringDepositPenalityConfigService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateRecurringDepositPenalityConfig(penalityConfigModel:any){
    return this.commonHttpService.put(penalityConfigModel, Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_PENALITY_CONFIGS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addRecurringDepositPenalityConfig(penalityConfigModel:any){
    return this.commonHttpService.post(penalityConfigModel, Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_PENALITY_CONFIGS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllRecurringDepositPenalityConfig(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_PENALITY_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getRecurringDepositPenalityConfigById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_PENALITY_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteRecurringDepositPenalityConfig(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_PENALITY_CONFIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
