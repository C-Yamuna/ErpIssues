import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class TermInterestPolicyService {
  constructor(private commonHttpService: CommonHttpService) { }

  updateTermInterestPolicy(borrowingsModel: any) {
    return this.commonHttpService.put(borrowingsModel,Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS+ ERP_TRANSACTION_CONSTANTS.TERM_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addTermInterestPolicy(borrowingsModel: any) {
    return this.commonHttpService.post(borrowingsModel,Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS+ ERP_TRANSACTION_CONSTANTS.TERM_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getTermInterestPolicyById(id: any) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllTermInterestPolicy(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteTermInterestPolicy(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 
  getInterestPolicyConfigByProductId(productId: string){
    let headers = new HttpHeaders({ 'productId': productId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_INTEREST_POLICY_CONFIG_BY_PRODUCTID);
  }





  updateTermApportionOrder(borrowingsModel: any) {
    return this.commonHttpService.put(borrowingsModel,Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS+ ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_APPORTION_CONFIGS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addTermApportionOrder(borrowingsModel: any) {
    return this.commonHttpService.post(borrowingsModel,Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS+ ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_APPORTION_CONFIGS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getTermApportionOrderById(id: any) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_APPORTION_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllTermApportionOrder(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_APPORTION_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteTermApportionOrder(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_APPORTION_CONFIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 
  getTermApportionOrderByProductId(productId: string){
    let headers = new HttpHeaders({ 'productId': productId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_APPORTION_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_PRODUCT_APPORTION_CONFIG_LIST_BY_PRODUCTID);
  }
}
