import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class CiLoanChargesDetailsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateCiLoanChargesDetails(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.CI_LOAN_CHARGES_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addCiLoanChargesDetails(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.CI_LOAN_CHARGES_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getCiLoanChargesDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_LOAN_CHARGES_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllCiLoanChargesDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_LOAN_CHARGES_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteCiLoanChargesDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_LOAN_CHARGES_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
