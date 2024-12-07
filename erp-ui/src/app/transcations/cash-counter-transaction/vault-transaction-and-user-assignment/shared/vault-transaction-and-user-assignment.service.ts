import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class VaultTransactionAndUserAssignmentService {
  
  constructor(private commonHttpService:CommonHttpService) { }

  updatVaultTransactionAndUserAssignment(vaulttransactionanduserassignmentModel:any){
    return this.commonHttpService.put(vaulttransactionanduserassignmentModel, Headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.VAULT_TO_COUNTER_TRANSACTION + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addVaultTransactionAndUserAssignment(vaulttransactionanduserassignmentModel:any){
    return this.commonHttpService.post(vaulttransactionanduserassignmentModel, Headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.VAULT_TO_COUNTER_TRANSACTION+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllVaultTransactionAndUserAssignment(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.VAULT_TO_COUNTER_TRANSACTION + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getVaultTransactionAndUserAssignmentById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.VAULT_TO_COUNTER_TRANSACTION + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteVaultTransactionAndUserAssignment(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.VAULT_TO_COUNTER_TRANSACTION + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getAllTransactionsForCashierScroll(branchId: any , pacsId: any, dateVal:any){
    let headers = new HttpHeaders({ 'pacsId':pacsId+'', 'branchId': branchId + '' , 'dateVal':dateVal + ''})
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.VAULT_TO_COUNTER_TRANSACTION + ERP_TRANSACTION_CONSTANTS.GET_ALL_TRANSACTIONS_FOR_CASHIER_SCROLL);
  }
}
