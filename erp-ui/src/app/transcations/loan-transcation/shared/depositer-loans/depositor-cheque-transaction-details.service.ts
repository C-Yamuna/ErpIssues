import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class DepositorChequeTransactionDetailsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateDepositorChequeTransactionDetails(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.DEPOSITOR_CHEQUE_TRANSACTION_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addDepositorChequeTransactionDetails(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.DEPOSITOR_CHEQUE_TRANSACTION_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getDepositorChequeTransactionDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITOR_CHEQUE_TRANSACTION_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllDepositorChequeTransactionDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITOR_CHEQUE_TRANSACTION_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteDepositorChequeTransactionDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITOR_CHEQUE_TRANSACTION_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
