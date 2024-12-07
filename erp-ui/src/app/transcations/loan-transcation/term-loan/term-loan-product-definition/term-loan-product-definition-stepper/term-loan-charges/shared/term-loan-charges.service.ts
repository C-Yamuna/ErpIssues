import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class TermLoanChargesService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateTermLoanCharges(chargesModel:any){
    return this.commonHttpService.put(chargesModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_CHARGES_CONFIGS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addTermLoanCharges(chargesModel:any){
    return this.commonHttpService.post(chargesModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_CHARGES_CONFIGS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllTermLoanCharges(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_CHARGES_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getTermLoanChargesById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_CHARGES_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteTermLoanCharges(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_CHARGES_CONFIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getTermLoanChargesByProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_CHARGES_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_TERM_PRODUCT_CHARGES_LIST_BY_PRODUCT_ID);
  }
}

