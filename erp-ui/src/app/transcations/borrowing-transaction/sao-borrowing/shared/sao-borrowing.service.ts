import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SaoBorrowingService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSaoBorrowing(saoborrowingsModel:any){
    return this.commonHttpService.put(saoborrowingsModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSaoBorrowing(saoborrowingsModel:any){
    return this.commonHttpService.post(saoborrowingsModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_BORROWING_ACCOUNTS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllSaoBorrowing(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSaoBorrowingById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSaoBorrowing(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  
  getBorrowingAccountsListByProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_BORROWING_ACCOUNTS_LIST_BY_PRODUCTID);
  }
  getBorrowingAccountsListByPacsIdAndBranchId(pacsId: any, id: any){
    let headers = new HttpHeaders({ 'pacsId': pacsId + '', 'id': id + ''})
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_BORROWING_ACCOUNTS_LIST_BY_PACSID_AND_BRANCHID);
  }
  getProductById(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }
}
