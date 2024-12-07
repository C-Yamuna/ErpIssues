import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SaoInterestPolicyConfigService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSaoInterestPolicyConfig(interestpolicyModel:any){
    return this.commonHttpService.put(interestpolicyModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSaoInterestPolicyConfig(interestpolicyModel:any){
    return this.commonHttpService.post(interestpolicyModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_INTEREST_POLICY_CONFIGS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllSaoInterestPolicyConfig(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSaoInterestPolicyConfigById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSaoInterestPolicyConfig(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  
  getSaoInterestPolicyConfigByProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_INTEREST_POLICY_CONFIG_BY_PRODUCTID);
  }

  updateSaoApportionOrder(apportionModel: any) {
    return this.commonHttpService.put(apportionModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SAO_APPORTION_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSaoApportionOrder(apportionModel: any) {
    return this.commonHttpService.post(apportionModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SAO_APPORTION_CONFIG + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSaoApportionOrderById(id: any) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_APPORTION_CONFIG + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSaoApportionOrder(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_APPORTION_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSaoApportionOrder(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_APPORTION_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
