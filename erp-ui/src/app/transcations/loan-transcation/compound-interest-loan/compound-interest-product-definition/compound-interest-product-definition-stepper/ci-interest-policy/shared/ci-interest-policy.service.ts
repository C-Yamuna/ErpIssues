import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class CiInterestPolicyService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateCiInterestPolicy(interestpolicyModel:any){
    return this.commonHttpService.put(interestpolicyModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addCiInterestPolicy(interestpolicyModel:any){
    return this.commonHttpService.post(interestpolicyModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_INTEREST_POLICY_CONFIGS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllCiInterestPolicy(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getCiInterestPolicyById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteCiInterestPolicy(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  
  getCiInterestPolicyByProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_CI_INTEREST_POLICY_CONFIG_BY_CI_PRODUCT_ID);
  }

  updateCiApportionOrder(apportionModel: any) {
    return this.commonHttpService.put(apportionModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.CI_APPORTION_CONFIGS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addCiApportionOrder(apportionModel: any) {
    return this.commonHttpService.post(apportionModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.CI_APPORTION_CONFIGS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getCiApportionOrderById(id: any) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_APPORTION_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllCiApportionOrder(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_APPORTION_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteCiApportionOrder(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_APPORTION_CONFIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
