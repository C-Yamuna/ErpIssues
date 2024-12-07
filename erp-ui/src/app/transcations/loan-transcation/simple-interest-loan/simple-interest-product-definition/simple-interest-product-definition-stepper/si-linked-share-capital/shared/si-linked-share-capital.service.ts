import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SiLinkedShareCapitalService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSiLinkedShareCapital(linkedShareCapitalModel:any){
    return this.commonHttpService.put(linkedShareCapitalModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_LINKED_SHARE_CAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSiLinkedShareCapital(linkedShareCapitalModel:any){
    return this.commonHttpService.post(linkedShareCapitalModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_LINKED_SHARE_CAPITAL_CONFIG+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllSiLinkedShareCapital(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_LINKED_SHARE_CAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSiLinkedShareCapitalById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_LINKED_SHARE_CAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSiLinkedShareCapital(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_LINKED_SHARE_CAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  
  getSiLinkedShareCapitalByProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_LINKED_SHARE_CAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_SI_LOAN_LINKED_SHARECAPITAL_CONFOG_BY_SI_PRODUCT_ID);
  }
}
