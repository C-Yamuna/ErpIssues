import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';
import { TermDepostModel } from './term-depost-model.model';

@Injectable({
  providedIn: 'root'
})
export class InterestPaymentSummaryService {

  constructor(private commonHttpService : CommonHttpService) { }
  updateInterestPaymentSummary(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.INTEREST_PAYMENT_SUMMARY + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addInterestPaymentSummary(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.INTEREST_PAYMENT_SUMMARY + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getAllInterestPaymentSummary() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.INTEREST_PAYMENT_SUMMARY + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getInterestPaymentSummary(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.INTEREST_PAYMENT_SUMMARY + ERP_TRANSACTION_CONSTANTS.GET)
  }
  getInterestPostingDetailsById(summaryId: string) {
    let headers = new HttpHeaders({ 'summaryId': summaryId + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.INTEREST_PAYMENT_SUMMARY + ERP_TRANSACTION_CONSTANTS.GET_INTEREST_POSTING_DETAILS_BY_ID)
  }
  deleteInterestPaymentSummary(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.INTEREST_PAYMENT_SUMMARY + ERP_TRANSACTION_CONSTANTS.DELETE)
  }
}
