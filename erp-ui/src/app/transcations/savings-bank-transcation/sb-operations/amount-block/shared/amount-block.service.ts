import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class AmountBlockService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSbAmountBlock(object:any){
    return this.commonHttpService.put(object, Headers, Configuration.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.AMOUNT_BLOCK + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSbAmountBlock(object:any){
    return this.commonHttpService.post(object, Headers, Configuration.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.AMOUNT_BLOCK+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllSbAmountBlock(){
    return this.commonHttpService.getAll(Configuration.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.AMOUNT_BLOCK + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
 
  getSbAmountBlockById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.AMOUNT_BLOCK + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSbAmountBlock(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.AMOUNT_BLOCK + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getSbAmountBlockByAccountNumber(accountNumber:any){
    let headers = new HttpHeaders({ 'accountNumber': accountNumber + '', })
    return this.commonHttpService.getById( headers, Configuration.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.AMOUNT_BLOCK + ERP_TRANSACTION_CONSTANTS.GET_ALL_AMOUNT_BLOCK_BY_ACCOUNT_NUMBER);
  }

 
}
