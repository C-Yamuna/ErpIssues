import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class FdNonCumulativeRequiredDocumentsService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateFdNonCumulativeRequiredDocuments(requiredDocumentsModel:any){
    return this.commonHttpService.put(requiredDocumentsModel, Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_NON_CUMULATIVE_REQUIRED_DOCUMENTS_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addFdNonCumulativeRequiredDocuments(requiredDocumentsModel:any){
    return this.commonHttpService.post(requiredDocumentsModel, Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_NON_CUMULATIVE_REQUIRED_DOCUMENTS_CONFIG+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllFdNonCumulativeRequiredDocuments(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_NON_CUMULATIVE_REQUIRED_DOCUMENTS_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getFdNonCumulativeRequiredDocumentsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_NON_CUMULATIVE_REQUIRED_DOCUMENTS_CONFIG + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteFdNonCumulativeRequiredDocuments(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_NON_CUMULATIVE_REQUIRED_DOCUMENTS_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  
  getFdNonCumulativeRequiredDocumentsProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_NON_CUMULATIVE_REQUIRED_DOCUMENTS_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_REQUIRED_DOCUMENTS_CONFIG_BY_PRODUCT_ID);
  }
}
