import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';
import { TermDepostModel } from './term-depost-model.model';

@Injectable({
  providedIn: 'root'
})
export class RdAccountTransactionService {

  constructor(private commonHttpService : CommonHttpService) { }
  updateRdAccountTransactions(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_TRANSACTIONS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addRdAccountTransactions(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_TRANSACTIONS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getAllRdAccountTransactions() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_TRANSACTIONS + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getRdAccountTransactions(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_TRANSACTIONS + ERP_TRANSACTION_CONSTANTS.GET)
  }
  deleteRdAccountTransactions(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_TRANSACTIONS + ERP_TRANSACTION_CONSTANTS.DELETE)
  }
}
