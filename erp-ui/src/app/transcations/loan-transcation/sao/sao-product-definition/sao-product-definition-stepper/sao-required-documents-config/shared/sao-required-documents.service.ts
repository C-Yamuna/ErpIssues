import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SaoRequiredDocumentsService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSaoRequiredDocuments(requiredDocumentsModel:any){
    return this.commonHttpService.put(requiredDocumentsModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_REQUIRED_DOCUMENTS_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSaoRequiredDocuments(requiredDocumentsModel:any){
    return this.commonHttpService.post(requiredDocumentsModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_REQUIRED_DOCUMENTS_CONFIG+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllSaoRequiredDocuments(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_REQUIRED_DOCUMENTS_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSaoRequiredDocumentsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_REQUIRED_DOCUMENTS_CONFIG + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSaoRequiredDocuments(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_REQUIRED_DOCUMENTS_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getSaoRequiredDocumentsByProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_REQUIRED_DOCUMENTS_CONFIG + ERP_TRANSACTION_CONSTANTS.SAO_GET_BY_PRODUCT_ID);
  }
}
