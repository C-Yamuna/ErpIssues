import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class SiLoanLinkedShareCapitalConfigService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateSILinkedShareCapitalConfig(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SI_LOAN_LINKED_SHARE_CAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSILinkedShareCapitalConfig(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SI_LOAN_LINKED_SHARE_CAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSILinkedShareCapitalConfigById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_LINKED_SHARE_CAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSILinkedShareCapitalConfig(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_LINKED_SHARE_CAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSILinkedShareCapitalConfig(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_LINKED_SHARE_CAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 getSILoanLinkedSharecapitalConfigBySIProductId(productId: string) {
    let headers = new HttpHeaders({ 'productId': productId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_LINKED_SHARE_CAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_SI_LOAN_LINKED_SHARECAPITAL_CONFOG_BY_SI_PRODUCT_ID);
  }
}
