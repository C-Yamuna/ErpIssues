import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransferTransactionDetailsService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateTransferTransactionDetails(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.TRANSFER_TRANSACTION_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addTransferTransactionDetails(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.TRANSFER_TRANSACTION_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllTransferTransactionDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.TRANSFER_TRANSACTION_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getTransferTransactionDetailsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.TRANSFER_TRANSACTION_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteTransferTransactionDetails(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.TRANSFER_TRANSACTION_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
