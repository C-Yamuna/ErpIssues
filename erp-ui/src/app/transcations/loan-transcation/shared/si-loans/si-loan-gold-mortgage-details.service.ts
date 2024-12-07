import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class SiLoanGoldMortgageDetailsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateSILoanGoldMortgageDetails(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SI_LOAN_GOLD_MORTGAGE_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSILoanGoldMortgageDetails(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SI_LOAN_GOLD_MORTGAGE_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSILoanGoldMortgageDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_GOLD_MORTGAGE_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSILoanGoldMortgageDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_GOLD_MORTGAGE_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSILoanGoldMortgageDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_GOLD_MORTGAGE_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getDetailsBySILoanApplicationId(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_GOLD_MORTGAGE_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_DETAILS_BY_SI_LOAN_APPLICATION_ID);
  }
}
