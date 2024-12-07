import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class DepositorProductChargesConfigsService {
  constructor(private commonHttpService: CommonHttpService) { }

  updateDepositorProductChargesConfigs(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.DEPOSITER_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addDepositorProductChargesConfigs(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.DEPOSITER_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getDepositorProductChargesConfigsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITER_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllDepositorProductChargesConfigs(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITER_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteDepositorProductChargesConfigs(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITER_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 getDepositerProductChargesDetailsByApplicableDuring(productId: string ) {
    let headers = new HttpHeaders({ 'productId': productId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITER_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_DEPOSITER_PRODUCT_CHARGES_DETAILS_BY_APPLICABLE_DURING);
  }
  getDepositerProductChargesConfigByCiProductId(productId: string ) {
    let headers = new HttpHeaders({ 'productId': productId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITER_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_DEPOSITER_PRODUCT_CHARGES_CONFIG_BY_CI_PRODUCT_ID);
  }
  getCalculatedSanctionAmount(productId: string ,sanctionAmount: string) {
    let headers = new HttpHeaders({ 'productId': productId + '' , 'sanctionAmount':sanctionAmount+ ''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITER_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_CALCULATED_SANCTION_AMOUNT);
  }
}
