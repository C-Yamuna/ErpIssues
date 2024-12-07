import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class TermProductChargesConfigService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateTermProductChargesConfig(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_CHARGES_CONFIGS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addTermProductChargesConfig(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_CHARGES_CONFIGS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getTermProductChargesConfigById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_CHARGES_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllTermProductChargesConfig(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_CHARGES_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteTermProductChargesConfig(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_CHARGES_CONFIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  GetProductChargesDetailsByApplicableDuring(id: string , productId: string) {
    let headers = new HttpHeaders({ 'id': id + '','productId':productId+ '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_CHARGES_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_PRODUCT_CHARGES_DETAILS_BY_APPLICABLE_DURING);
  }
  GetCalculatedSanctionAmount(id: string , productId: string) {
    let headers = new HttpHeaders({ 'id': id + '','productId':productId+ '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_CHARGES_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_CALCULATED_SANCTION_AMOUNT);
  }
}
