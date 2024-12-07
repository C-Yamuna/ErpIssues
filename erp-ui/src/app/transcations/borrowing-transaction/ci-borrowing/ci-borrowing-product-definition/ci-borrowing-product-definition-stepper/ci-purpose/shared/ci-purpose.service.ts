import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class CiPurposeService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateCiPurpose(purposeModel:any){
    return this.commonHttpService.put(purposeModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_PRODUCT_PURPOSE_CONFIGS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addCiPurpose(purposeModel:any){
    return this.commonHttpService.post(purposeModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_PRODUCT_PURPOSE_CONFIGS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllCiPurpose(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_PRODUCT_PURPOSE_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getCiPurposeById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_PRODUCT_PURPOSE_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteCiPurpose(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_PRODUCT_PURPOSE_CONFIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getCiPurposeByProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_PRODUCT_PURPOSE_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL_BY_PRODUCTID);
  }
}