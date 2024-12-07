import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class VaultToDccbTransactionService {

  constructor(private commonHttpService:CommonHttpService) { }
  updatVaultToDccbTransaction(vaulttodccbtransactionModel:any){
    return this.commonHttpService.put(vaulttodccbtransactionModel, Headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.VAULT_TO_DCCB_TRANSACTION + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addVaultToDccbTransaction(vaulttodccbtransactionModel:any){
    return this.commonHttpService.post(vaulttodccbtransactionModel, Headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.VAULT_TO_DCCB_TRANSACTION+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllVaultToDccbTransaction(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.VAULT_TO_DCCB_TRANSACTION + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getVaultToDccbTransactionById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.VAULT_TO_DCCB_TRANSACTION + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteVaultToDccbTransaction(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.VAULT_TO_DCCB_TRANSACTION + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
