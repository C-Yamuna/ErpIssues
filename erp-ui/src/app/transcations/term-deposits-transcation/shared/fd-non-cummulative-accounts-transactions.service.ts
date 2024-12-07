import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class FdNonCummulativeAccountsTransactionsService {

  constructor(private commonHttpService : CommonHttpService) { }

  updateFdNonCummulativeAccountsTransactions(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNTS_TRANSACTIONS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addFdNonCummulativeAccountsTransactions(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNTS_TRANSACTIONS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getAllFdNonCummulativeAccountsTransactions() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNTS_TRANSACTIONS + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getFdNonCummulativeAccountsTransactionsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNTS_TRANSACTIONS + ERP_TRANSACTION_CONSTANTS.GET)
  }
  deleteFdNonCummulativeAccountsTransactions(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNTS_TRANSACTIONS + ERP_TRANSACTION_CONSTANTS.DELETE)
  }
}
