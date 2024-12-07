import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class DepositorLoanLinkedSharecapitalConfigsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateDepositorLoanLinkedSharecapitalConfigs(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.DEPOSITER_LOAN_LINKED_SHARECAPITAL_CONFIGS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addDepositorLoanLinkedSharecapitalConfigs(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.DEPOSITER_LOAN_LINKED_SHARECAPITAL_CONFIGS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getDepositorLoanLinkedSharecapitalConfigsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITER_LOAN_LINKED_SHARECAPITAL_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllDepositorLoanLinkedSharecapitalConfigs(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITER_LOAN_LINKED_SHARECAPITAL_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteDepositorLoanLinkedSharecapitalConfigs(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITER_LOAN_LINKED_SHARECAPITAL_CONFIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getDepositerLoanLinkedShareCapitalConfigByCiProductId(productId: string) {
    let headers = new HttpHeaders({ 'productId': productId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITER_LOAN_LINKED_SHARECAPITAL_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_DEPOSITOR_LOAN_LINKED_SHARECAPITAL_CONFIG_BY_CI_PRODUCT_ID);
  }
}
