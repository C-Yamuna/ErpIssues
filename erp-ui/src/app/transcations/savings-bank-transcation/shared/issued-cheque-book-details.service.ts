import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssuedChequeBookDetailsService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateIssuedChequeBookDetails(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.ISSUED_CHEQUE_BOOK_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addIssuedChequeBookDetails(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.ISSUED_CHEQUE_BOOK_DETAILS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getIssuedChequeBookByAccountNumber(accountNumber: any){
    let headers = new HttpHeaders({ 'accountNumber': accountNumber + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.ISSUED_CHEQUE_BOOK_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ISSUED_CHEQUE_BOOK_BY_ACCOUNT_NUMBER);
  }

  getAllIssuedChequeBookDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.ISSUED_CHEQUE_BOOK_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getIssuedChequeBookDetailsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.ISSUED_CHEQUE_BOOK_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteIssuedChequeBookDetails(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.ISSUED_CHEQUE_BOOK_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
