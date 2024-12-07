import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../../erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SbTransactionService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSbTransaction(object:any){
    return this.commonHttpService.put(object, Headers, Configuration.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_TRANSACTION + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSbTransaction(object:any){
    return this.commonHttpService.post(object, Headers, Configuration.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_TRANSACTION+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllSbTransaction(){
    return this.commonHttpService.getAll(Configuration.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_TRANSACTION + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
 
  getSbTransaction(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_TRANSACTION + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteTransaction(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_TRANSACTION + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  getAllDenominationTypes(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.DENOMINATION_TYPES + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getTopFiveTransactions(id:any){
    let headers = new HttpHeaders({ 'accountId': id + '', })
    return this.commonHttpService.getById( headers, Configuration.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_TRANSACTION + ERP_TRANSACTION_CONSTANTS.GET_TOP_FIVE_RECORDS_OF_TRANSACTIONS);
  }
}
