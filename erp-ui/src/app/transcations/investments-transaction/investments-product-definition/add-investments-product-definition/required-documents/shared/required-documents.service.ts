import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class RequiredDocumentsService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateRequiredDocuments(object: any) {
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.INVESTMENT_REQUIRED_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addRequiredDocuments(object: any) {
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.INVESTMENT_REQUIRED_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllRequiredDocuments() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.INVESTMENT_REQUIRED_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getRequiredDocumentsById(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.INVESTMENT_REQUIRED_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteRequiredDocuments(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.INVESTMENT_REQUIRED_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  getByProductId(productId: any) {
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.INVESTMENT_REQUIRED_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.GET_BY_PRODUC_ID);
  }

  getByProductIdAndDocumentTypeId(productId: any,documentTypeId:any) {
    let headers = new HttpHeaders({ 'productId': productId + '','documentTypeId': documentTypeId + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.INVESTMENT_REQUIRED_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.GET_BY_PRODUCT_ID_AND_DOCUMENT_TYPE_ID);
  }
}
