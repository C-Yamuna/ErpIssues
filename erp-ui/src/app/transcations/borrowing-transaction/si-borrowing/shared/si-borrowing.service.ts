import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SiBorrowingService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSiBorrowing(siborrowingsModel:any){
    return this.commonHttpService.put(siborrowingsModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSiBorrowing(siborrowingsModel:any){
    return this.commonHttpService.post(siborrowingsModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_ACCOUNTS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllSiBorrowing(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSiBorrowingById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSiBorrowing(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getPreviewDataBySiBorrowingAccountId(borrowingAccountId: any){
    let headers = new HttpHeaders({ 'borrowingAccountId': borrowingAccountId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_PREVIEW_DATA_BY_BORROWING_ACCOUNTID);
  }
  
  getSiBorrowingAccountsListByProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_SI_BORROWING_ACCOUNTS_LIST_BY_PRODUCTID);
  }
  getSiBorrowingAccountsListByPacsIdAndBranchId(pacsId: any, id: any){
    let headers = new HttpHeaders({ 'pacsId': pacsId + '', 'id': id + ''})
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_SI_BORROWING_ACCOUNTS_LIST_BY_PACSID_AND_BRANCHID);
  }
}
