import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  constructor(private commonHttpService:CommonHttpService) { }
  updateExchange(exchangeModel:any){
    return this.commonHttpService.put(exchangeModel, Headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.EXCHANGE + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addExchange(exchangeModel:any){
    return this.commonHttpService.post(exchangeModel, Headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.EXCHANGE+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllExchange(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.EXCHANGE + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getExchangeById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.EXCHANGE + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteExchange(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.EXCHANGE + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
