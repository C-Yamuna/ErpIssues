import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class CiBorrowingDocumentsService {
  constructor(private commonHttpService:CommonHttpService) { }
  updateCiBorrowingDocuments(siborrowingsModel:any){
    return this.commonHttpService.put(siborrowingsModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_BORROWING_ACCOUNT_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addCiBorrowingDocuments(siborrowingsModel:any){
    return this.commonHttpService.post(siborrowingsModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_BORROWING_ACCOUNT_DOCUMENTS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllCiBorrowingDocuments(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_BORROWING_ACCOUNT_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getCiBorrowingDocumentsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_BORROWING_ACCOUNT_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteCiBorrowingDocuments(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_BORROWING_ACCOUNT_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getByCiBorrowingAccountId(borrowingAccountId: any){
    let headers = new HttpHeaders({ 'borrowingAccountId': borrowingAccountId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_BORROWING_ACCOUNT_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.GET_BY_BORROWING_ACCOUNT_ID);
  }
}
