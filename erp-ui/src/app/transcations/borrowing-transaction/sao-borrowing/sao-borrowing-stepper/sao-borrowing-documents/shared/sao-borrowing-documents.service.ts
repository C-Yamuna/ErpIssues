import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SaoBorrowingDocumentsService {

  constructor(private commonHttpService:CommonHttpService) { }
  updateSaoBorrowingDocuments(saoborrowingDocumentModel:any){
    return this.commonHttpService.put(saoborrowingDocumentModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_BORROWING_ACCOUNT_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSaoBorrowingDocuments(saoborrowingDocumentModel:any){
    return this.commonHttpService.post(saoborrowingDocumentModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_BORROWING_ACCOUNT_DOCUMENTS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllSaoBorrowingDocuments(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_BORROWING_ACCOUNT_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSaoBorrowingDocumentsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_BORROWING_ACCOUNT_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSaoBorrowingDocuments(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_BORROWING_ACCOUNT_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getBySaoBorrowingAccountId(borrowingAccountId: any){
    let headers = new HttpHeaders({ 'borrowingAccountId': borrowingAccountId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_BORROWING_ACCOUNT_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.GET_BY_BORROWING_ACCOUNT_ID);
  }
}
