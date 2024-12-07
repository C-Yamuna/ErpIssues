import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class DepositorBondsMortgageDetailsService {
  constructor(private commonHttpService: CommonHttpService) { }

  updateDepositorBondsMortgageDetails(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.DEPOSITOR_BONDS_MORTGAGE_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addDepositorBondsMortgageDetails(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.DEPOSITOR_BONDS_MORTGAGE_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getDepositorBondsMortgageDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITOR_BONDS_MORTGAGE_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllDepositorBondsMortgageDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITOR_BONDS_MORTGAGE_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteDepositorBondsMortgageDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITOR_BONDS_MORTGAGE_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getDetailsByDepositorLoanApplicationId(productId: string) {
    let headers = new HttpHeaders({ 'productId': productId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITOR_BONDS_MORTGAGE_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_DETAILS_BY_DEPOSITOR_LOAN_APPLICATION_ID);
  }
}
