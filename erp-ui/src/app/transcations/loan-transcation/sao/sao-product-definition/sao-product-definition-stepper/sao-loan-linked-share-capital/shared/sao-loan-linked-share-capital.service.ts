import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SaoLoanLinkedShareCapitalService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSaoLoanLinkedShareCapital(linkedShareCapitalModel:any){
    return this.commonHttpService.put(linkedShareCapitalModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_LINKED_SHARECAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSaoLoanLinkedShareCapital(linkedShareCapitalModel:any){
    return this.commonHttpService.post(linkedShareCapitalModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_LINKED_SHARECAPITAL_CONFIG+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllSaoLoanLinkedShareCapital(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_LINKED_SHARECAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSaoLoanLinkedShareCapitalById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_LINKED_SHARECAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSaoLoanLinkedShareCapital(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_LINKED_SHARECAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  
  getSaoInterestPolicyConfigByProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_LINKED_SHARECAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_SAO_LOAN_LINKED_SHARE_CAPITAL_CONFIG_BY_PRODUCT_ID);
  }
}
