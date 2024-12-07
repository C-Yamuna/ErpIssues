import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class CiLinkedShareCapitalService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateCiLinkedShareCapital(borrowingsModel: any) {
    return this.commonHttpService.put(borrowingsModel,Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS+ ERP_TRANSACTION_CONSTANTS.CI_BORROWING_LINKED_SHARECAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addCiLinkedShareCapital(borrowingsModel: any) {
    return this.commonHttpService.post(borrowingsModel,Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS+ ERP_TRANSACTION_CONSTANTS.CI_BORROWING_LINKED_SHARECAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getCiLinkedShareCapitalById(id: any) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_BORROWING_LINKED_SHARECAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllCiLinkedShareCapital(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_BORROWING_LINKED_SHARECAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteCiLinkedShareCapital(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_BORROWING_LINKED_SHARECAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 
  getCiLinkedShareCapitalByProductId(productId: string){
    let headers = new HttpHeaders({ 'productId': productId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_BORROWING_LINKED_SHARECAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.BORROWING_LINKED_SHARECAPITAL_CONFIG_GET_BY_PRODUCT_ID);
  }
}
