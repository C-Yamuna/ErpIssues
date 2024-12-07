import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequiredDocumentConfigService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateRequiredDocumentConfig(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.REQUIRED_DOCUMENT_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addRequiredDocumentConfig(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.REQUIRED_DOCUMENT_CONFIG+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getRequriedDocumentsConfigByProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.REQUIRED_DOCUMENT_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_REQUIRED_DOCUMENTS_CONFIG_BY_PRODUCT_ID);
  }

  getAllRequiredDocumentConfig(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.REQUIRED_DOCUMENT_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getRequiredDocumentConfigById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.REQUIRED_DOCUMENT_CONFIG + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteRequiredDocumentConfig(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.REQUIRED_DOCUMENT_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
