import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { Configuration } from 'src/app/configurations/configurations-constants';
@Injectable({
  providedIn: 'root'
})
export class SiLoanDocumentsDetailsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateSILoanDocumentsDetails(loansModel: any) {
    return this.commonHttpService.put(loansModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_DOCUMENT_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }

  addSILoanDocumentsDetails(loansModel: any) {
    return this.commonHttpService.post(loansModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_DOCUMENT_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }

  getSILoanDocumentsDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_DOCUMENT_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  getAllSILoanDocumentsDetails() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_DOCUMENT_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  deleteSILoanDocumentsDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_DOCUMENT_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  getAllDocuments() {
    return this.commonHttpService.getAll(Configuration.LOANS + Configuration.DOC_TYPES + Configuration.GET_ALL);
  }

  getSILoanDocumentsDetailsByLoanAccId(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_DOCUMENT_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_SI_LOAN_DOCUMENT_DETAILS_BY_LOAN_ID);
  }

}
