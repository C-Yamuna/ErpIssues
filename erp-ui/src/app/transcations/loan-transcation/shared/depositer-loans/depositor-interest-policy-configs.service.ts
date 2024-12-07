import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class DepositorInterestPolicyConfigsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateDepositorInterestPolicyConfigs(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.DEPOSITOR_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addDepositorInterestPolicyConfigs(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.DEPOSITOR_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getDepositorInterestPolicyConfigsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITOR_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllDepositorInterestPolicyConfigs(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITOR_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteDepositorInterestPolicyConfigs(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITOR_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getDepositorInterestPolicyConfigByCiProductId(productId: string) {
    let headers = new HttpHeaders({ 'productId': productId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITOR_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_DEPOSITER_INTEREST_POLICY_CONFIG_BY_CI_PRODUCT_ID);
  }
}
