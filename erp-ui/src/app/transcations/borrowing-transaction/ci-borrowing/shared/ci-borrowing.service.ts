import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class CiBorrowingService {
  constructor(private commonHttpService:CommonHttpService) { }

  updateCiBorrowing(ciborrowingsModel:any){
    return this.commonHttpService.put(ciborrowingsModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addCiBorrowing(ciborrowingsModel:any){
    return this.commonHttpService.post(ciborrowingsModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_BORROWING_ACCOUNTS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllCiBorrowing(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getCiBorrowingById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteCiBorrowing(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getPreviewDataByCiBorrowingAccountId(borrowingAccountId: any){
    let headers = new HttpHeaders({ 'borrowingAccountId': borrowingAccountId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_PREVIEW_DATA_BY_BORROWING_ACCOUNTID);
  }
  
  getCiBorrowingAccountsListByProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_BORROWING_ACCOUNTS_LIST_BY_PRODUCTID);
  }
  getCiBorrowingAccountsListByPacsIdAndBranchId(pacsId: any, id: any){
    let headers = new HttpHeaders({ 'pacsId': pacsId + '', 'id': id + ''})
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_BORROWING_ACCOUNTS_LIST_BY_PACSID_AND_BRANCHID);
  }
}
