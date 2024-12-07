import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SbAccountServicesOptedService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSbAccountServicesOpted(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_ACCOUNT_SERVICES_OPTED + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSbAccountServicesOpted(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_ACCOUNT_SERVICES_OPTED + ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllSbAccountServicesOpted(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_ACCOUNT_SERVICES_OPTED + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getAccountServicesBySbAccId(sbAccId: any){
    let headers = new HttpHeaders({ 'sbAccId': sbAccId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_ACCOUNT_SERVICES_OPTED + ERP_TRANSACTION_CONSTANTS.GET);
  }

  getSbAccountServicesOptedById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_ACCOUNT_SERVICES_OPTED + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSbAccountServicesOpted(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_ACCOUNT_SERVICES_OPTED + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
