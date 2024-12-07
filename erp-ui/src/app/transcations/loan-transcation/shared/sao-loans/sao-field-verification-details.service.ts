import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class SaoFieldVerificationDetailsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateSaoFieldVerificationDetails(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SAO_FIELD_VERIFICATION_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSaoFieldVerificationDetails(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SAO_FIELD_VERIFICATION_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSaoFieldVerificationDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_FIELD_VERIFICATION_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSaoFieldVerificationDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_FIELD_VERIFICATION_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSaoFieldVerificationDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_FIELD_VERIFICATION_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getSaoFieldVerifivcationDetailsByLoanApplicationId(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_FIELD_VERIFICATION_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_SAO_FIELD_VERIFICATION_DETAILS_BY_LOAN_APPLICATION_ID);
  }
}
