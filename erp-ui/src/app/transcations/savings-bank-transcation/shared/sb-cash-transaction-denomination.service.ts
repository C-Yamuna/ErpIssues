import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SbCashTransactionDenominationService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSbCashTranscationDenomination(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_CASH_TRANSACTION_DENOMINATION + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSbCashTranscationDenomination(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_CASH_TRANSACTION_DENOMINATION + ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllSbCashTranscationDenomination(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_CASH_TRANSACTION_DENOMINATION + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSbCashTranscationDenominationById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_CASH_TRANSACTION_DENOMINATION + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSbCashTranscationDenomination(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_CASH_TRANSACTION_DENOMINATION + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
