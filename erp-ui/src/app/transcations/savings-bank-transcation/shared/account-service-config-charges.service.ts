import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceConfigChargesService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateAccountServiceConfigCharges(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.ACCOUNT_SERVICE_CONFIG_CHARGES + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addAccountServiceConfigCharges(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.ACCOUNT_SERVICE_CONFIG_CHARGES+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAccountServiceConfigChargesByProductId(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.ACCOUNT_SERVICE_CONFIG_CHARGES + ERP_TRANSACTION_CONSTANTS.GET_ACCOUNT_SERVICE_CONFIG_CHARGES_BY_PRODUCT_ID);
  }

  getAllAccountServiceConfigCharges(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.ACCOUNT_SERVICE_CONFIG_CHARGES + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getAccountServiceConfigChargesById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.ACCOUNT_SERVICE_CONFIG_CHARGES + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteAccountServiceConfigCharges(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.ACCOUNT_SERVICE_CONFIG_CHARGES + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
