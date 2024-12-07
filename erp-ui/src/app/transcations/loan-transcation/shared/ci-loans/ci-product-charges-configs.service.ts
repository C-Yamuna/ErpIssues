import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class CiProductChargesConfigsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateCiTransactionDetails(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.CI_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addCiTransactionDetails(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.CI_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getCiTransactionDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllCiTransactionDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteCiTransactionDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getCiProductChargesDetailsByApplicableDuring(productId: string , sanctionAmount: string) {
    let headers = new HttpHeaders({ 'productId': productId + '' , 'sanctionAmount':sanctionAmount+''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_CI_PRODUCT_CHARGES_DETAIKLS_BY_APPLICABLE_DURING);
  }
  getCiProductChargesConfigByCiProductId(productId: string) {
    let headers = new HttpHeaders({ 'productId': productId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_CI_PRODUCT_CHARGES_CONFIG_BY_CI_PRODUCT_ID);
  }
  getCalculatedSanctionAmount(productId: string , sanctionAmount: string) {
    let headers = new HttpHeaders({ 'productId': productId + '' , 'sanctionAmount':sanctionAmount+''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_CALCULATED_SANCTION_AMOUNT);
  }
}
