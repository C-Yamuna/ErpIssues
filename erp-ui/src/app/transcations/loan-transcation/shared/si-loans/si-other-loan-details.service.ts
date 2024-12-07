import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class SiOtherLoanDetailsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateSIOtherLoanDetails(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SI_OTHER_LOAN_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSIOtherLoanDetails(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SI_OTHER_LOAN_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSIOtherLoanDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_OTHER_LOAN_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSIOtherLoanDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_OTHER_LOAN_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSIOtherLoanDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_OTHER_LOAN_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 getSIOtherLoanDetailsByLoanApplicationId(loanApplicationId: string) {
    let headers = new HttpHeaders({ 'loanApplicationId': loanApplicationId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_OTHER_LOAN_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_SI_OTHER_LOANS_DETAILS_BY_LOAN_APPLICATION_ID);
  }
}
