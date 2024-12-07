import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class TermLoanApplicationsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateTermLoanApplication(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.TERM_LOAN_APPLICATIONS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addTermLoanApplication(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.TERM_LOAN_APPLICATIONS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getTermLoanApplicationById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_LOAN_APPLICATIONS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllTermLoanApplication(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_LOAN_APPLICATIONS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteTermLoanApplication(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_LOAN_APPLICATIONS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  termLoanApplicationApproval(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_LOAN_APPLICATIONS + ERP_TRANSACTION_CONSTANTS.TERM_LOAN_APPLICATION_APPROVAL);
  }
 convertSaoLoanToTermLoan(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.TERM_LOAN_APPLICATIONS + ERP_TRANSACTION_CONSTANTS.CONVERT_SAO_LOAN_TO_TERM_LOAN)
  }
  getTermLoanApplicationDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_LOAN_APPLICATIONS + ERP_TRANSACTION_CONSTANTS.GET_TERM_LOAN_APPLICATION_DETAILS_BY_ID);
  }
}
