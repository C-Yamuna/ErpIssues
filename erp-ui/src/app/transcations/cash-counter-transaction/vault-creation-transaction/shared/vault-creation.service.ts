import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class VaultCreationService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateVaultCreation(vaultcreationModel:any){
    return this.commonHttpService.put(vaultcreationModel, Headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.VAULT + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addVaultCreation(vaultcreationModel:any){
    return this.commonHttpService.post(vaultcreationModel, Headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.VAULT+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllVaultCreation(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.VAULT + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getVaultCreationById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.VAULT + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deletVaultCreation(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.VAULT + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
