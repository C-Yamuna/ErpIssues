import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class ServiceChargesService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateServiceCharges(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.ACCOUNT_SERVICE_CONFIG_CHARGES + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addServiceCharges(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.ACCOUNT_SERVICE_CONFIG_CHARGES+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getServiceChargesByProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.ACCOUNT_SERVICE_CONFIG_CHARGES + ERP_TRANSACTION_CONSTANTS.GET_ACCOUNT_SERVICE_CONFIG_CHARGES_BY_PRODUCT_ID);
  }

  getAllServiceCharges(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.ACCOUNT_SERVICE_CONFIG_CHARGES + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getServiceChargesById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.ACCOUNT_SERVICE_CONFIG_CHARGES + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteServiceCharges(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.ACCOUNT_SERVICE_CONFIG_CHARGES + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
