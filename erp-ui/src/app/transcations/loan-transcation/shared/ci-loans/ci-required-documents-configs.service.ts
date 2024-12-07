import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class CiRequiredDocumentsConfigsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateCiRequiredDocumentsConfigs(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.CI_REQUIRED_DOCUMENTS_CONFIGS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addCiRequiredDocumentsConfigs(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.CI_REQUIRED_DOCUMENTS_CONFIGS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getCiRequiredDocumentsConfigsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_REQUIRED_DOCUMENTS_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllCiRequiredDocumentsConfigs(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_REQUIRED_DOCUMENTS_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteCiRequiredDocumentsConfigs(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_REQUIRED_DOCUMENTS_CONFIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getCiRequiredConfigByCiProductId(productId: string) {
    let headers = new HttpHeaders({ 'productId': productId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_REQUIRED_DOCUMENTS_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_CI_REQUIRED_DOCUMENTS_CONFIG_BY_CI_PRODUCT_ID);
  }
}
