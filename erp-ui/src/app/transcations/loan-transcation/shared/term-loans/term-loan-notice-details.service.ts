import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class TermLoanNoticeDetailsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateTermLoanNoticeDetails(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.TERM_LOAN_NOTICE_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addTermLoanNoticeDetails(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.TERM_LOAN_NOTICE_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getTermLoanNoticeDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_LOAN_NOTICE_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllTermLoanNoticeDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_LOAN_NOTICE_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteTermLoanNoticeDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_LOAN_NOTICE_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  GetTermNoticeDetailsByLoanApplicationId(id: string, loanApplicationId: string) {
    let headers = new HttpHeaders({ 'id': id + '','loanApplicationId': loanApplicationId+''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_LOAN_NOTICE_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_TERM_NOTICE_DETAILS_BY_LOAN_APPLICATION_ID);
  }
}
