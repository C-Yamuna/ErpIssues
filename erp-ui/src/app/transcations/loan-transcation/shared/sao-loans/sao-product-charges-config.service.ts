import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class SaoProductChargesConfigService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateSaoTransactionDetails(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SAO_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSaoTransactionDetails(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SAO_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSaoTransactionDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSaoTransactionDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSaoTransactionDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getSaoProductChargesDetailsByApplicableDuring(productId: string ,sanctionAmount: string) {
    let headers = new HttpHeaders({ 'productId': productId + '' , 'sanctionAmount': sanctionAmount +''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_SAO_PRODUCT_CHARGES_DETAILS_BY_APPLICABLE_DURING);
  }
  getCalculatedSanctionAmount(productId: string ,sanctionAmount: string) {
    let headers = new HttpHeaders({ 'productId': productId + '' , 'sanctionAmount': sanctionAmount +''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_CALCULATED_SANCTION_AMOUNT);
  }
}
