import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class SiApportionConfigService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateSIApportionConfig(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SI_APPORTION_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSIApportionConfig(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SI_APPORTION_CONFIG + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSIApportionConfigById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_APPORTION_CONFIG + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSIApportionConfig(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_APPORTION_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSIApportionConfig(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_APPORTION_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 getSIApportionConfigBySIProductId(productId: string) {
    let headers = new HttpHeaders({ 'productId': productId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_APPORTION_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_SI_APPORTION_CONFIG_BY_SI_PRODUCT_ID);
  }
}