import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class SaoLoanDocumentsDetailsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateSaoLoanDocumentsDetails(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SAO_LOAN_DOCUMENTS_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSaoLoanDocumentsDetails(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SAO_LOAN_DOCUMENTS_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSaoLoanDocumentsDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_DOCUMENTS_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSaoLoanDocumentsDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_DOCUMENTS_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSaoLoanDocumentsDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_DOCUMENTS_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getSaoLoanDocumentsDetailsByApplicationId(id: string){
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_DOCUMENTS_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_SAO_LOAN_DOCUMENT_DETAILS_BY_ID);
  }
  getAllDocumentTypes(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DOCUMENT_TYPES + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
}
