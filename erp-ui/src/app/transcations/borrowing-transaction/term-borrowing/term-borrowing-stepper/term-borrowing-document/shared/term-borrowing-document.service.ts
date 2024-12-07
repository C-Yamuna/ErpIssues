import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class TermBorrowingDocumentService {

  constructor(private commonHttpService:CommonHttpService) { }
  updateTermBorrowingDocument(termborrowingDocumentModel:any){
    return this.commonHttpService.put(termborrowingDocumentModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_BORROWING_ACCOUNT_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addTermBorrowingDocument(termborrowingDocumentModel:any){
    return this.commonHttpService.post(termborrowingDocumentModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_BORROWING_ACCOUNT_DOCUMENTS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllTermBorrowingDocument(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_BORROWING_ACCOUNT_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getTermBorrowingDocumentById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_BORROWING_ACCOUNT_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteTermBorrowingDocument(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_BORROWING_ACCOUNT_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getByBorrowingAccountId(borrowingAccountId: any){
    let headers = new HttpHeaders({ 'borrowingAccountId': borrowingAccountId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_BORROWING_ACCOUNT_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.GET_BY_BORROWING_ACCOUNT_ID);
  }
}
