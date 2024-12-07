import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class SiProductChargesConfigService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateSIProductChargesConfig(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSIProductChargesConfig(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSIProductChargesConfigById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSIProductChargesConfig(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSIProductChargesConfig(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 getSIProductChargesConfigBySIProductId(productId: string) {
    let headers = new HttpHeaders({ 'productId': productId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_SI_PRODUCT_CHARGES_CONFIG_BY_SI_PRODUCT_ID);
  }
  getSiChargesDetailsByApplicableDuring(productId: string) {
    let headers = new HttpHeaders({ 'productId': productId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_SI_CHARGES_DETAILS_BY_APPLICABLE_DURING);
  }
  getCalculatedSanctionAmount(productId: string , sanctionAmount: string) {
    let headers = new HttpHeaders({ 'productId': productId + '' , 'sanctionAmount':sanctionAmount + ''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_CALCULATED_SANCTION_AMOUNT);
  }
}
