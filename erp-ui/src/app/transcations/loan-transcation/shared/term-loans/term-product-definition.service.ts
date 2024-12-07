import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class TermProductDefinitionService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateTermProductDefinitions(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_DEFINITIONS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addTermProductDefinitions(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_DEFINITIONS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getTermProductDefinitionsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_DEFINITIONS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllTermProductDefinitions(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_DEFINITIONS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteTermProductDefinitions(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_DEFINITIONS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  GetTermProductDefinitionPreviewByProductId(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_DEFINITIONS + ERP_TRANSACTION_CONSTANTS.GET_TERM_PRODUCT_DEFINITION_PREVIEW_BY_PRODUCT_ID);
  }
}
