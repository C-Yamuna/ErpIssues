import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class TermRequiredDocumentsService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateTermRequiredDocuments(requiredDocumentsModel:any){
    return this.commonHttpService.put(requiredDocumentsModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_REQUIRED_DOCUMENTS_CONFIGS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addTermRequiredDocuments(requiredDocumentsModel:any){
    return this.commonHttpService.post(requiredDocumentsModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_REQUIRED_DOCUMENTS_CONFIGS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllTermRequiredDocuments(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_REQUIRED_DOCUMENTS_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getTermRequiredDocumentsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_REQUIRED_DOCUMENTS_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteTermRequiredDocuments(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_REQUIRED_DOCUMENTS_CONFIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getTermRequiredDocumentsByProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_REQUIRED_DOCUMENTS_CONFIGS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_REQUIRED_DOCUMENTS_CONFIG_GET_BY_PRODUCTID);
  }
}
