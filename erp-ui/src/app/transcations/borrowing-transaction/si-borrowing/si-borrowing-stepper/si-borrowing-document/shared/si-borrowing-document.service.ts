import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SiBorrowingDocumentService {
  
  constructor(private commonHttpService:CommonHttpService) { }
  updateSiBorrowingDocument(siborrowingsModel:any){
    return this.commonHttpService.put(siborrowingsModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_ACCOUNT_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSiBorrowingDocument(siborrowingsModel:any){
    return this.commonHttpService.post(siborrowingsModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_ACCOUNT_DOCUMENTS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllSiBorrowingDocument(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_ACCOUNT_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSiBorrowingDocumentById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_ACCOUNT_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSiBorrowingDocument(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_ACCOUNT_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getBySiBorrowingAccountId(borrowingAccountId: any){
    let headers = new HttpHeaders({ 'borrowingAccountId': borrowingAccountId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_ACCOUNT_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.GET_BY_SI_BORROWING_ACCOUNT_ID);
  }
  
  
}
