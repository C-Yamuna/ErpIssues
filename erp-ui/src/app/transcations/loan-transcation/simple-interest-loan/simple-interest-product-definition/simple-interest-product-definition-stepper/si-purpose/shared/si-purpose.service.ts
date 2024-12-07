import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SiPurposeService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSiPurpose(purposeModel:any){
    return this.commonHttpService.put(purposeModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_PROD_PURPOSE_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSiPurpose(purposeModel:any){
    return this.commonHttpService.post(purposeModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_PROD_PURPOSE_CONFIG+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllSiPurpose(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_PROD_PURPOSE_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSiPurposeById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_PROD_PURPOSE_CONFIG + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSiPurpose(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_PROD_PURPOSE_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getSiPurposeByProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_PROD_PURPOSE_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_SI_PROD_PURPOSE_CONFIG_BY_SI_PRODUCT_ID);
  }
}
