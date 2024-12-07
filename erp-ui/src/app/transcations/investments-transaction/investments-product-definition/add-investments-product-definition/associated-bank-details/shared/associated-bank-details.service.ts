import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class AssociatedBankDetailsService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateAssociatedBankDetails(object: any) {
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.PRODUCT_ASSOCIATED_BANK_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addAssociatedBankDetails(object: any) {
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.PRODUCT_ASSOCIATED_BANK_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllAssociatedBankDetails() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.PRODUCT_ASSOCIATED_BANK_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getAssociatedBankDetailsById(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.PRODUCT_ASSOCIATED_BANK_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteAssociatedBankDetails(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.PRODUCT_ASSOCIATED_BANK_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  getProductAssociatedBankDetailsByProductId(productid: any) {
    let headers = new HttpHeaders({ 'productid': productid + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.PRODUCT_ASSOCIATED_BANK_DETAILS + ERP_TRANSACTION_CONSTANTS.PRODUCT_ASSOCIATED_BANK_DETAILS_BY_PRODUCT_ID);
  }

  getInvestedBankDetailsByProductId(productid: any) {
    let headers = new HttpHeaders({ 'productid': productid + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.PRODUCT_ASSOCIATED_BANK_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_INVESTED_BANK_DETAILS_BY_PRODUCT_ID);
  }
}
