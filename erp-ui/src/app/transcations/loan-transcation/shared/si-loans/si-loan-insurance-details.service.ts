import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class SiLoanInsuranceDetailsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateSILoanInsuranceDetails(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SI_LOAN_INSURANCE_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSILoanInsuranceDetails(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SI_LOAN_INSURANCE_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSILoanInsuranceDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_INSURANCE_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSILoanInsuranceDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_INSURANCE_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSILoanInsuranceDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_INSURANCE_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 
}
