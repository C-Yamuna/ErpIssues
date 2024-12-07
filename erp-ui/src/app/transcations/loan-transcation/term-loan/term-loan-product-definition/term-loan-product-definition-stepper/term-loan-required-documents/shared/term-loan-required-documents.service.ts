import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class TermLoanRequiredDocumentsService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateTermLoanRequiredDocuments(requiredDocumentsModel:any){
    return this.commonHttpService.put(requiredDocumentsModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_REQUIRED_DOCUMENTS_CONFIGS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addTermLoanRequiredDocuments(requiredDocumentsModel:any){
    return this.commonHttpService.post(requiredDocumentsModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_REQUIRED_DOCUMENTS_CONFIGS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllTermLoanRequiredDocuments(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_REQUIRED_DOCUMENTS_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getTermLoanRequiredDocumentsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_REQUIRED_DOCUMENTS_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteTermLoanRequiredDocuments(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_REQUIRED_DOCUMENTS_CONFIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getTermLoanRequiredDocumentsByProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_REQUIRED_DOCUMENTS_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_REQUIRED_DOCUMENTS_CONFIG_LIST_BY_PRODUCT_ID);
  }
}
