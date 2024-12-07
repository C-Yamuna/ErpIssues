import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class CiInterestPolicyService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateCiInterestPolicy(borrowingsModel: any) {
    return this.commonHttpService.put(borrowingsModel,Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS+ ERP_TRANSACTION_CONSTANTS.CI_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addCiInterestPolicy(borrowingsModel: any) {
    return this.commonHttpService.post(borrowingsModel,Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS+ ERP_TRANSACTION_CONSTANTS.CI_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getCiInterestPolicyById(id: any) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllCiInterestPolicy(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteCiInterestPolicy(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 
  getCiInterestPolicyByProductId(productId: string){
    let headers = new HttpHeaders({ 'productId': productId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_INTEREST_POLICY_CONFIG_BY_PRODUCTID);
  }





  updateCiApportionOrder(borrowingsModel: any) {
    return this.commonHttpService.put(borrowingsModel,Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS+ ERP_TRANSACTION_CONSTANTS.CI_PRODUCT_APPORTION_CONFIGS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addCiApportionOrder(borrowingsModel: any) {
    return this.commonHttpService.post(borrowingsModel,Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS+ ERP_TRANSACTION_CONSTANTS.CI_PRODUCT_APPORTION_CONFIGS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getCiApportionOrderById(id: any) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_PRODUCT_APPORTION_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllCiApportionOrder(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_PRODUCT_APPORTION_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteCiApportionOrder(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_PRODUCT_APPORTION_CONFIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 
  getCiApportionOrderByProductId(productId: string){
    let headers = new HttpHeaders({ 'productId': productId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_PRODUCT_APPORTION_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_PRODUCT_APPORTION_CONFIG_LIST_BY_PRODUCTID);
  }
}
