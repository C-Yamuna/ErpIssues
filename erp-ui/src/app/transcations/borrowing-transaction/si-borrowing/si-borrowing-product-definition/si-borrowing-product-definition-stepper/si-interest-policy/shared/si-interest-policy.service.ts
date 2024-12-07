import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SiInterestPolicyService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateSiInterestPolicy(borrowingsModel: any) {
    return this.commonHttpService.put(borrowingsModel,Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS+ ERP_TRANSACTION_CONSTANTS.SI_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSiInterestPolicy(borrowingsModel: any) {
    return this.commonHttpService.post(borrowingsModel,Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS+ ERP_TRANSACTION_CONSTANTS.SI_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSiInterestPolicyById(id: any) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSiInterestPolicy(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSiInterestPolicy(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 
  getSiInterestPolicyByProductId(productId: string){
    let headers = new HttpHeaders({ 'productId': productId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_SI_INTEREST_POLICY_CONFIG_BY_SI_PRODUCT_ID);
  }





  updateSiApportionOrder(borrowingsModel: any) {
    return this.commonHttpService.put(borrowingsModel,Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS+ ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_APPORTION_CONFIGS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSiApportionOrder(borrowingsModel: any) {
    return this.commonHttpService.post(borrowingsModel,Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS+ ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_APPORTION_CONFIGS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSiApportionOrderById(id: any) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_APPORTION_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSiApportionOrder(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_APPORTION_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSiApportionOrder(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_APPORTION_CONFIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 
  getSiApportionOrderByProductId(productId: string){
    let headers = new HttpHeaders({ 'productId': productId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_APPORTION_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_SI_PRODUCT_APPORTION_CONFIG_LIST_BY_SI_PRODUCTID);
  }
}
