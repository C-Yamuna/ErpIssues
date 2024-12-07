import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class CiRequiredDocumentsService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateCiRequiredDocuments(requiredDocumentsModel:any){
    return this.commonHttpService.put(requiredDocumentsModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_REQUIRED_DOCUMENTS_CONFIGS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addCiRequiredDocuments(requiredDocumentsModel:any){
    return this.commonHttpService.post(requiredDocumentsModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_REQUIRED_DOCUMENTS_CONFIGS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllCiRequiredDocuments(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_REQUIRED_DOCUMENTS_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getCiRequiredDocumentsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_REQUIRED_DOCUMENTS_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteCiRequiredDocuments(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_REQUIRED_DOCUMENTS_CONFIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getCiRequiredDocumentsByProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_REQUIRED_DOCUMENTS_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_CI_REQUIRED_DOCUMENTS_CONFIG_BY_CI_PRODUCT_ID);
  }
}
