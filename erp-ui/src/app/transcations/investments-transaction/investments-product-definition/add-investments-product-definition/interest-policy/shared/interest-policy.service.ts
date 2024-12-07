import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class InterestPolicyService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateInterestPolicyConfig(object: any) {
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addInterestPolicyConfig(object: any) {
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllInterestPolicyConfig() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getInterestPolicyConfigById(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteInterestPolicyConfig(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  getInterestPolicyConfigByProductId(productid: any) {
    let headers = new HttpHeaders({ 'productid': productid + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_INTEREST_POLICY_CONFIG_BY_PRODUCT_ID);
  }
}
