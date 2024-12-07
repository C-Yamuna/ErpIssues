import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SaoPurposeService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSaoPurpose(purposeModel:any){
    return this.commonHttpService.put(purposeModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_PRODUCT_PURPOSE_CONFIGS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSaoPurpose(purposeModel:any){
    return this.commonHttpService.post(purposeModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_PRODUCT_PURPOSE_CONFIGS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllSaoPurpose(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_PRODUCT_PURPOSE_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSaoPurposeById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_PRODUCT_PURPOSE_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSaoPurpose(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_PRODUCT_PURPOSE_CONFIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getSaoPurposeByProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_PRODUCT_PURPOSE_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL_BY_PRODUCTID);
  }
}
