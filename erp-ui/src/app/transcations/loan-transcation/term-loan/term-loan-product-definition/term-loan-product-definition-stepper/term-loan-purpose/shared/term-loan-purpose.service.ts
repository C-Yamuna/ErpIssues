import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class TermLoanPurposeService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateTermLoanPurpose(purposeModel:any){
    return this.commonHttpService.put(purposeModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_PROD_PURPOSE_CONFIGS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addTermLoanPurpose(purposeModel:any){
    return this.commonHttpService.post(purposeModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_PROD_PURPOSE_CONFIGS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllTermLoanPurpose(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_PROD_PURPOSE_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getTermLoanPurposeById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_PROD_PURPOSE_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteTermLoanPurpose(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_PROD_PURPOSE_CONFIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getTermLoanPurposeByProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_PROD_PURPOSE_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_PROD_PURPOSE_CONFIG_LIST_BY_PRODUCT_ID);
  }
}
