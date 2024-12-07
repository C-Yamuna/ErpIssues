import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class SbTransactionDetailsService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSbTransactionDetails(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_TRANSACTION_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  approveSbTransaction(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_TRANSACTION_DETAILS + ERP_TRANSACTION_CONSTANTS.APPROVE_SB_TRANSACTION);
  }

  addSbTransactionDetails(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_TRANSACTION_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllSbTransactionDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_TRANSACTION_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSbTransactionDetailsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_TRANSACTION_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSbTransactionDetails(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_TRANSACTION_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
