import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class SiProdPurposeConfigService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateSIProdPurposeConfig(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SI_PROD_PURPOSE_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSIProdPurposeConfig(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SI_PROD_PURPOSE_CONFIG + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSIProdPurposeConfigById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_PROD_PURPOSE_CONFIG + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSIProdPurposeConfig(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_PROD_PURPOSE_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSIProdPurposeConfig(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_PROD_PURPOSE_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 getSIProdPurposeConfigBySIProductId(productId: string) {
    let headers = new HttpHeaders({ 'productId': productId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_PROD_PURPOSE_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_SI_PROD_PURPOSE_CONFIH_BY_SI_PRODUCT_ID);
  }
}
