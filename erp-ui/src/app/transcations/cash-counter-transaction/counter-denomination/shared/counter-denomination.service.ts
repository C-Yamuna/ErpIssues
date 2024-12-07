import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class CounterDenominationService {

  constructor(private commonHttpService:CommonHttpService) { }
  updateCounterDenomination(counterdenominationModel:any){
    return this.commonHttpService.put(counterdenominationModel, Headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.COUNTER_DENOMINATION + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addCounterDenomination(counterdenominationModel:any){
    return this.commonHttpService.post(counterdenominationModel, Headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.COUNTER_DENOMINATION+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllCounterDenomination(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.COUNTER_DENOMINATION + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getCounterDenominationById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.COUNTER_DENOMINATION + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteCounterDenomination(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.COUNTER_DENOMINATION + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
