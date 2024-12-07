import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class TermOtherLoanDetailsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateTermOtherLoanDetails(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.TERM_OTHER_LOAN_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addTermOtherLoanDetails(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.TERM_OTHER_LOAN_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getTermOtherLoanDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_OTHER_LOAN_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllTermOtherLoanDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_OTHER_LOAN_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteTermOtherLoanDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_OTHER_LOAN_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  GetTermOtherLoansDetailsByTermLoanApplicationId(id: string, loanApplicationId: string) {
    let headers = new HttpHeaders({ 'id': id + '','loanApplicationId': loanApplicationId+''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_OTHER_LOAN_DETAILS + ERP_TRANSACTION_CONSTANTS.GER_TERM_OTHER_LOANS_DETAILS_BY_TERM_LOAN_APPLICATION_ID);
  }
}
