import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InterestPolicyConfigService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateInterestPolicyConfig(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.INTEREST_POLICY_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addInterestPolicyConfig(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.INTEREST_POLICY_CONFIG+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getSbRoi(pacsId: any,isSeniorCitizen: any,isStaff:any){
    let headers = new HttpHeaders({ 'pacsId': pacsId + '', 'isSeniorCitizen' : isSeniorCitizen + '' , 'isStaff' : isStaff + ''})
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.INTEREST_POLICY_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_SB_ROI);
  }

  getInterestPolicyConfigByProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.INTEREST_POLICY_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_INTEREST_POLICY_CONFIG_BY_PRODUCT_ID);
  }

  getAllInterestPolicyConfig(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.INTEREST_POLICY_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getInterestPolicyConfigById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.INTEREST_POLICY_CONFIG + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteInterestPolicyConfig(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.INTEREST_POLICY_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
