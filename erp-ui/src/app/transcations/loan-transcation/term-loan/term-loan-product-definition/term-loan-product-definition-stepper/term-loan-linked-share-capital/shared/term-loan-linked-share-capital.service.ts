import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class TermLoanLinkedShareCapitalService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateTermLoanLinkedShareCapital(linkedShareCapitalModel:any){
    return this.commonHttpService.put(linkedShareCapitalModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_LOAN_LINKED_SHARECAPITAL_CONFIGS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addTermLoanLinkedShareCapital(linkedShareCapitalModel:any){
    return this.commonHttpService.post(linkedShareCapitalModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_LOAN_LINKED_SHARECAPITAL_CONFIGS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllTermLoanLinkedShareCapital(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_LOAN_LINKED_SHARECAPITAL_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getTermLoanLinkedShareCapitalById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_LOAN_LINKED_SHARECAPITAL_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteTermLoanLinkedShareCapital(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_LOAN_LINKED_SHARECAPITAL_CONFIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  
  getTermLoanLinkedShareCapitalByProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_LOAN_LINKED_SHARECAPITAL_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_LOAN_LINKED_SHARE_CAPITAL_LIST_BY_PRODUCT_ID);
  }
}
