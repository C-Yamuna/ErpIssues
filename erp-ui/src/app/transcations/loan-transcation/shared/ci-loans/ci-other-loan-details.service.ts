import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class CiOtherLoanDetailsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateCiOtherLoanDetails(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.CI_OTHER_LOAN_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addCiOtherLoanDetails(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.CI_OTHER_LOAN_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getCiOtherLoanDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_OTHER_LOAN_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllCiOtherLoanDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_OTHER_LOAN_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteCiOtherLoanDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_OTHER_LOAN_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getCiOtherLoansDetailsByCiLoanApplicationId(loanApplicationId: string) {
    let headers = new HttpHeaders({ 'loanApplicationId': loanApplicationId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_OTHER_LOAN_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_CI_OTHER_LOANS_DETAILS_BY_CI_LOAN_APPLICATION_ID);
  }
}
