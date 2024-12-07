import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class FdCommulativeInterestPolicyConfigService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateFdCommulativeInterestPolicyConfig(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_INTEREST_POLICY_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addFdCommulativeInterestPolicyConfig(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_INTEREST_POLICY_CONFIG + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getFdCommulativeInterestPolicyConfigById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_INTEREST_POLICY_CONFIG + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllFdCommulativeInterestPolicyConfig(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_INTEREST_POLICY_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteFdCommulativeInterestPolicyConfig(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_INTEREST_POLICY_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 getInterestPolicyConfigByProductId(productId: string) {
    let headers = new HttpHeaders({ 'productId': productId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_INTEREST_POLICY_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_INTERST_POLICY_CONFIG_BY_PRODUCT_ID);
  }
 
}
