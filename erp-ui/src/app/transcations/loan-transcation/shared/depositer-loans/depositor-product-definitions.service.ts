import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class DepositorProductDefinitionsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateDepositorProductDefinitions(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.DEPOSITOR_PRODUCT_DEFINITIONS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addDepositorProductDefinitions(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.DEPOSITOR_PRODUCT_DEFINITIONS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getDepositorProductDefinitionsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITOR_PRODUCT_DEFINITIONS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllDepositorProductDefinitions(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITOR_PRODUCT_DEFINITIONS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteDepositorProductDefinitions(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITOR_PRODUCT_DEFINITIONS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 getDepositerProductDefinitionByProductId(productId: string ) {
    let headers = new HttpHeaders({ 'productId': productId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITOR_PRODUCT_DEFINITIONS + ERP_TRANSACTION_CONSTANTS.GET_DEPOSITER_PRODUCT_DEFINITION_BY_PRODUCT_ID);
  }
}
