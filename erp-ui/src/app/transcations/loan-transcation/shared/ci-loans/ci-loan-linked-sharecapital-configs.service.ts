import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class CiLoanLinkedSharecapitalConfigsService {
  constructor(private commonHttpService: CommonHttpService) { }

  updateCiLoanLinkedSharecapitalConfigs(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.CI_LOAN_LINKED_SHARECAPITAL_CONFIGS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addCiLoanLinkedSharecapitalConfigs(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.CI_LOAN_LINKED_SHARECAPITAL_CONFIGS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getCiLoanLinkedSharecapitalConfigsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_LOAN_LINKED_SHARECAPITAL_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllCiLoanLinkedSharecapitalConfigs(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_LOAN_LINKED_SHARECAPITAL_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteCiLoanLinkedSharecapitalConfigs(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_LOAN_LINKED_SHARECAPITAL_CONFIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getCiLoanLinkedSharecapitalConfigByCiProductId(productId: string) {
    let headers = new HttpHeaders({ 'productId': productId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_LOAN_LINKED_SHARECAPITAL_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_CI_LOAN_LINKED_SHARECAPITAL_CONFIG_BY_CI_PRODUCT_ID);
  }
}
