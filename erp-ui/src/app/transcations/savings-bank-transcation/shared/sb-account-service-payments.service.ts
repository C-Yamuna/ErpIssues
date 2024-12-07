import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SbAccountServicePaymentsService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSbAccountServicePayments(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_ACCOUNT_SERVICE_PAYMENTS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSbAccountServicePayments(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_ACCOUNT_SERVICE_PAYMENTS + ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllSbAccountServicePayments(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_ACCOUNT_SERVICE_PAYMENTS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSbAccountServicePaymentsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_ACCOUNT_SERVICE_PAYMENTS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSbAccountServicePayments(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_ACCOUNT_SERVICE_PAYMENTS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
