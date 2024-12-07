import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';
import { TermDepostModel } from './term-depost-model.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionsModeService {

  constructor(private commonHttpService : CommonHttpService) { }
  updateTransactionsMode(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.TRANSACTIONS_MODES + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addTransactionsMode(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.TRANSACTIONS_MODES + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getAllTransactionsMode() {
    return this.commonHttpService.getAll( ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.TRANSACTIONS_MODES + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getTransactionsMode(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.TRANSACTIONS_MODES + ERP_TRANSACTION_CONSTANTS.GET)
  }
  deleteTransactionsMode(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.TRANSACTIONS_MODES + ERP_TRANSACTION_CONSTANTS.DELETE)
  }
}
