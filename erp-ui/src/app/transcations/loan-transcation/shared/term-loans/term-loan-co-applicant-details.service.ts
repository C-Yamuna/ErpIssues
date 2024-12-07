import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class TermLoanCoApplicantDetailsService {
  constructor(private commonHttpService: CommonHttpService) { }

  updateTermLoanCoApplicantDetails(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.TERM_LOAN_CO_APPLICANT_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addTermLoanCoApplicantDetails(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.TERM_LOAN_CO_APPLICANT_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getTermLoanCoApplicantDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_LOAN_CO_APPLICANT_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllTermLoanCoApplicantDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_LOAN_CO_APPLICANT_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteTermLoanCoApplicantDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_LOAN_CO_APPLICANT_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getTermLoanCoApplicantByLoanApplicationId(id: string , loanApplicationId: string) {
    let headers = new HttpHeaders({ 'id': id + '' , 'loanApplicationId': loanApplicationId +'loanApplicationId'})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_LOAN_CO_APPLICANT_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_TERM_LOAN_CO_APPLICANT_BY_LOAN_APPLICATION_ID);
  }
}
