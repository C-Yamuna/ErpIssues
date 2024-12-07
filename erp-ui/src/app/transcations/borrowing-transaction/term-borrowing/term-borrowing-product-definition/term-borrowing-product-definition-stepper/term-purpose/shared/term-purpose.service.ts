import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class TermPurposeService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateTermPurpose(purposeModel:any){
    return this.commonHttpService.put(purposeModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_PURPOSE_CONFIGS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addTermPurpose(purposeModel:any){
    return this.commonHttpService.post(purposeModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_PURPOSE_CONFIGS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllTermPurpose(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_PURPOSE_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getTermPurposeById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_PURPOSE_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteTermPurpose(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_PURPOSE_CONFIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getTermPurposeByProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_PURPOSE_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL_BY_PRODUCTID);
  }
}
