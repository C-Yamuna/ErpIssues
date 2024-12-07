import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';
import { TermDepostModel } from './term-depost-model.model';

@Injectable({
  providedIn: 'root'
})
export class InterestPaymentsService {

  constructor(private commonHttpService : CommonHttpService) { }
  updateInterestPayments(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.INTEREST_PAYMENTS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  saveInterestPaymentList(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.INTEREST_PAYMENTS + ERP_TRANSACTION_CONSTANTS.SAVE_INTEREST_PAYMENT_LIST)
  }
  addInterestPayments(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.INTEREST_PAYMENTS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getAllInterestPayments() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.INTEREST_PAYMENTS + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getInterestPayments(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.INTEREST_PAYMENTS + ERP_TRANSACTION_CONSTANTS.GET)
  }
  getTransactionListBasedOnAccountWithDueInterestPayments(accountNumber: string) {
    let headers = new HttpHeaders({ 'accountNumber': accountNumber + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.INTEREST_PAYMENTS + ERP_TRANSACTION_CONSTANTS.GET_TRANSACTION_LIST_BASED_ON_ACCOUNT_WITH_DUE_INTEREST_PAYMENTS)
  }
  getAllTransactionListWithPaymentDetails(accountNumber: string) {
    let headers = new HttpHeaders({ 'accountNumber': accountNumber + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.INTEREST_PAYMENTS + ERP_TRANSACTION_CONSTANTS.GET_ALL_TRANSACTION_LIST_WITH_INTEREST_PAYMENT_DETAILS)
  }
  deleteInterestPayments(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.INTEREST_PAYMENTS + ERP_TRANSACTION_CONSTANTS.DELETE)
  }
}
