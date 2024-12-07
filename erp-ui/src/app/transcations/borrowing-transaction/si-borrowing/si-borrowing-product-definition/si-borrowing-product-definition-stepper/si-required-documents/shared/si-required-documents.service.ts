import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SiRequiredDocumentsService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSiRequiredDocuments(requiredDocumentsModel:any){
    return this.commonHttpService.put(requiredDocumentsModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_REQUIRED_DOCUMENTS_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSiRequiredDocuments(requiredDocumentsModel:any){
    return this.commonHttpService.post(requiredDocumentsModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_REQUIRED_DOCUMENTS_CONFIG+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllSiRequiredDocuments(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_REQUIRED_DOCUMENTS_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSiRequiredDocumentsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_REQUIRED_DOCUMENTS_CONFIG + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSiRequiredDocuments(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_REQUIRED_DOCUMENTS_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getSiRequiredDocumentsByProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_REQUIRED_DOCUMENTS_CONFIG + ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_REQUIRED_DOCUMENTS_CONFIG_GET_BY_SI_PRODUCTID);
  }
}
