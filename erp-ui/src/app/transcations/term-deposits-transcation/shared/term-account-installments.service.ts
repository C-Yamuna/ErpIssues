import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';
import { TermDepostModel } from './term-depost-model.model';

@Injectable({
  providedIn: 'root'
})
export class TermAccountInstallmentsService {

  constructor(private commonHttpService : CommonHttpService) { }
  updateTermAccountInstallments(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.TERM_ACCOUNT_INSTALLMENTS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  AddTermAccountInstallmentWithTransaction(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.TERM_ACCOUNT_INSTALLMENTS + ERP_TRANSACTION_CONSTANTS.ADD_INSTALLMENT_WITH_TRANSACTION)
  }
  AddTermAccountInstallment(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.TERM_ACCOUNT_INSTALLMENTS + ERP_TRANSACTION_CONSTANTS.ADD)
  } 
  getListAccountWithDueInstallmentsWithTransactionsList(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.TERM_ACCOUNT_INSTALLMENTS + ERP_TRANSACTION_CONSTANTS.GET_LIST_ACCOUNT_WITH_DUE_INSTALLMENTS_WITH_TRANSACTIONS_LIST)
  }
  getListAccountWithDueInstallmentsWithAllTransactionsList(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.TERM_ACCOUNT_INSTALLMENTS + ERP_TRANSACTION_CONSTANTS.GET_LIST_ACCOUNT_WITH_DUE_INSTALLMENTS_WITH_ALL_TRANSACTIONS_LIST)
  }
  getListAccountWithDueInstallments(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.TERM_ACCOUNT_INSTALLMENTS + ERP_TRANSACTION_CONSTANTS.GET_LIST_ACCOUNT_WITH_DUE_INSTALLMENTS)
  }
  getListAccount(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.TERM_ACCOUNT_INSTALLMENTS + ERP_TRANSACTION_CONSTANTS.GET_LIST_ACCOUNT)
  }
  getAllTermAccountInstallments() {
    return this.commonHttpService.getAll( ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.TERM_ACCOUNT_INSTALLMENTS + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getTermAccountInstallment(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.TERM_ACCOUNT_INSTALLMENTS + ERP_TRANSACTION_CONSTANTS.GET)
  }
  deleteTermAccountInstallment(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.TERM_ACCOUNT_INSTALLMENTS + ERP_TRANSACTION_CONSTANTS.DELETE)
  }


}
