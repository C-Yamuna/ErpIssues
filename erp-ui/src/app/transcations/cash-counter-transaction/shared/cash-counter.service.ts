import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class CashCounterService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateashCounter(cashcounterModel:any){
    return this.commonHttpService.put(cashcounterModel, Headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.CASH_COUNTER + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addashCounter(cashcounterModel:any){
    return this.commonHttpService.post(cashcounterModel, Headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.CASH_COUNTER+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllashCounter(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.CASH_COUNTER + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getashCounterById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.CASH_COUNTER + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteashCounter(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.CASH_COUNTER + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
