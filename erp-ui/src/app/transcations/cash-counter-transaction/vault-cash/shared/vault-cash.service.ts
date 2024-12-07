import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class VaultCashService {

  constructor(private commonHttpService:CommonHttpService) { }
  updateVaultCash(vaultcashModel:any){
    return this.commonHttpService.put(vaultcashModel, Headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.VAULT_CASH + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addVaultCash(vaultcashModel:any){
    return this.commonHttpService.post(vaultcashModel, Headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.VAULT_CASH+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllVaultCash(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.VAULT_CASH + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getVaultCashById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.VAULT_CASH + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteVaultCash(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.VAULT_CASH + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
