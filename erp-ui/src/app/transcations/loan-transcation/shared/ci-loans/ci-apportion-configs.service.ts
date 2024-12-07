import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class CiApportionConfigsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateCiApportionConfigs(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.CI_APPORTION_CONFIGS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addCiApportionConfigs(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.CI_APPORTION_CONFIGS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getCiApportionConfigsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_APPORTION_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllCiApportionConfigs(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_APPORTION_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteCiApportionConfigs(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_APPORTION_CONFIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getCiApportionConfigByCiProductId(productId: string) {
    let headers = new HttpHeaders({ 'productId': productId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_APPORTION_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_CI_APPORTION_CONFIGS_BY_CI_PRODUCT_ID);
  }
}
