import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class DepositorAccountLedgerDetailsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateDepositorAccountLedgerDetails(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.DEPOSITOR_ACCOUNT_LEDGER_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addDepositorAccountLedgerDetails(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.DEPOSITOR_ACCOUNT_LEDGER_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getDepositorAccountLedgerDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITOR_ACCOUNT_LEDGER_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllDepositorAccountLedgerDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITOR_ACCOUNT_LEDGER_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteDepositorAccountLedgerDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITOR_ACCOUNT_LEDGER_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  
}
