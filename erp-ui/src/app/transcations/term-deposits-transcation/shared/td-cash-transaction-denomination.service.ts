import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';
import { TermDepostModel } from './term-depost-model.model';

@Injectable({
  providedIn: 'root'
})
export class TdCashTransactionDenominationService {

  constructor(private commonHttpService : CommonHttpService) { }
  updateTermDepositCashTransactionDenomination(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.TD_CASH_TRANSACTION_DENOMINATION + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addTermDepositCashTransactionDenomination(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.TD_CASH_TRANSACTION_DENOMINATION + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getAllTermDepositCashTransactionDenomination() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.TD_CASH_TRANSACTION_DENOMINATION + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getTermDepositCashTransactionDenomination(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.TD_CASH_TRANSACTION_DENOMINATION + ERP_TRANSACTION_CONSTANTS.GET)
  }
  deleteTermDepositCashTransactionDenomination(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.TD_CASH_TRANSACTION_DENOMINATION + ERP_TRANSACTION_CONSTANTS.DELETE)
  }
}
