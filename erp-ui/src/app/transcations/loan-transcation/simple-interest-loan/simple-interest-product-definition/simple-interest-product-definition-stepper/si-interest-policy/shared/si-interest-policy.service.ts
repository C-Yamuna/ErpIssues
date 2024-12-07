import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SiInterestPolicyService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSiInterestPolicy(interestpolicyModel:any){
    return this.commonHttpService.put(interestpolicyModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSiInterestPolicy(interestpolicyModel:any){
    return this.commonHttpService.post(interestpolicyModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_INTEREST_POLICY_CONFIGS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllSiInterestPolicy(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSiInterestPolicyById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSiInterestPolicy(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  
  getSiInterestPolicyByProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_SI_INTEREST_POLICY_CONFIG_BY_SI_PRODUCT_ID);
  }

  updateSiApportionOrder(apportionModel: any) {
    return this.commonHttpService.put(apportionModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SI_APPORTION_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSiApportionOrder(apportionModel: any) {
    return this.commonHttpService.post(apportionModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SI_APPORTION_CONFIG + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSiApportionOrderById(id: any) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_APPORTION_CONFIG + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSiApportionOrder(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_APPORTION_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSiApportionOrder(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_APPORTION_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
