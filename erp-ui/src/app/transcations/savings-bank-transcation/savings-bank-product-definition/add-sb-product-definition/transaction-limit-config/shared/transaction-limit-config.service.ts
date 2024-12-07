import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class TransactionLimitConfigService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateTransactionLimitConfig(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.TRANSACTION_LIMIT_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addTransactionLimitConfig(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.TRANSACTION_LIMIT_CONFIG+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getTransactionLimitConfigByProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.TRANSACTION_LIMIT_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_TRANSACTION_LIMIT_CONFIG_BY_PRODUCT_ID);
  }

  getAllTransactionLimitConfig(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.TRANSACTION_LIMIT_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getTransactionLimitConfigById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.TRANSACTION_LIMIT_CONFIG + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteTransactionLimitConfig(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.TRANSACTION_LIMIT_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
