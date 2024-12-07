import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class SiFieldVerificationDetailsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateSIFieldVerificationDetails(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SI_FIELD_VERIFICATION_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSIFieldVerificationDetails(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SI_FIELD_VERIFICATION_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSIFieldVerificationDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_FIELD_VERIFICATION_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSIFieldVerificationDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_FIELD_VERIFICATION_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSIFieldVerificationDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_FIELD_VERIFICATION_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getSIFieldVerificationDetailsByLoanApplicationId(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_FIELD_VERIFICATION_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_SI_FIELD_VERIFICATION_DETAILS_BY_LOAN_APPLICATION_ID);
  }
}
