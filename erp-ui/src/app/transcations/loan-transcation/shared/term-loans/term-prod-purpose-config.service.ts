import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class TermProdPurposeConfigService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateTermProductPurposeConfig(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_PURPOSE_CONGIGS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addTermProductPurposeConfig(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_PURPOSE_CONGIGS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getTermProductPurposeConfigById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_PURPOSE_CONGIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllTermProductPurposeConfig(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_PURPOSE_CONGIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteTermProductPurposeConfig(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_PURPOSE_CONGIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 
}