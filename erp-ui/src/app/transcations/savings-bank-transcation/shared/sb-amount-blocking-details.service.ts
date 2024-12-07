import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SbAmountBlockingDetailsService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSbAmountBlockingDetails(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_AMOUNT_BLOCKING_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  sbBlockedAmountApproval(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_AMOUNT_BLOCKING_DETAILS + ERP_TRANSACTION_CONSTANTS.SB_BLOCKED_AMOUNT_APPROVAL);
  }

  addSbAmountBlockingDetails(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_AMOUNT_BLOCKING_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllBlockedAmountsByAccountNumber(accountNumber: any){
    let headers = new HttpHeaders({ 'accountNumber': accountNumber + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_AMOUNT_BLOCKING_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL_BLOCKED_AMOUNTS_BY_ACCOUNT_NUMBER);
  }

  getAllSbAmountBlockingDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_AMOUNT_BLOCKING_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSbAmountBlockingDetailsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_AMOUNT_BLOCKING_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSbAmountBlockingDetails(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_AMOUNT_BLOCKING_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
