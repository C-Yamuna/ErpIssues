import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class CiLinkedShareCapitalService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateCiLinkedShareCapital(linkedShareCapitalModel:any){
    return this.commonHttpService.put(linkedShareCapitalModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_LOAN_LINKED_SHARECAPITAL_CONFIGS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addCiLinkedShareCapital(linkedShareCapitalModel:any){
    return this.commonHttpService.post(linkedShareCapitalModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_LOAN_LINKED_SHARECAPITAL_CONFIGS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllCiLinkedShareCapital(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_LOAN_LINKED_SHARECAPITAL_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getCiLinkedShareCapitalById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_LOAN_LINKED_SHARECAPITAL_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteCiLinkedShareCapital(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_LOAN_LINKED_SHARECAPITAL_CONFIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  
  getCiLinkedShareCapitalByProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_LOAN_LINKED_SHARECAPITAL_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_CI_LOAN_LINKED_SHARECAPITAL_CONFIG_BY_CI_PRODUCT_ID);
  }
}
