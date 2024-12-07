import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class RecurringDepositInterestPolicyService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateRecurringDepositInterestPolicy(interestpolicyModel:any){
    return this.commonHttpService.put(interestpolicyModel, Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_INTEREST_POLICY_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addRecurringDepositInterestPolicy(interestpolicyModel:any){
    return this.commonHttpService.post(interestpolicyModel, Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_INTEREST_POLICY_CONFIG+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllRecurringDepositInterestPolicy(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_INTEREST_POLICY_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getRecurringDepositInterestPolicyById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_INTEREST_POLICY_CONFIG + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteRecurringDepositInterestPolicy(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_INTEREST_POLICY_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  
  getRecurringDepositInterestPolicyByProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_INTEREST_POLICY_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_INTEREST_POLICY_CONFIG_BY_PRODUCT_ID);
  }
}
