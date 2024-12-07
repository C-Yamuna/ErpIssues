import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutoPaymentSummariesService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateAutoPaymentSummaries(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.AUTO_PAYMENTS_SUMMARIES + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addAutoPaymentSummaries(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.AUTO_PAYMENTS_SUMMARIES+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAutoPaymentSummaryByAutoPaymentList(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.AUTO_PAYMENTS_SUMMARIES + ERP_TRANSACTION_CONSTANTS.GET_AUTO_PAYMENT_SUMMARY_BY_AUTO_PAYMENT_LIST);
  }

  getAllAutoPaymentSummaries(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.AUTO_PAYMENTS_SUMMARIES + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getAutoPaymentSummariesById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.AUTO_PAYMENTS_SUMMARIES + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteAutoPaymentSummaries(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.AUTO_PAYMENTS_SUMMARIES + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
