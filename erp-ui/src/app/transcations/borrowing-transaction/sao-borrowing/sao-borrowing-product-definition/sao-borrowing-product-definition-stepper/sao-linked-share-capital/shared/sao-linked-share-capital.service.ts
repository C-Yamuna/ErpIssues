import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SaoLinkedShareCapitalService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateSaoLinkedShareCapital(borrowingsModel: any) {
    return this.commonHttpService.put(borrowingsModel,Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS+ ERP_TRANSACTION_CONSTANTS.SAO_BORROWING_LINKED_SHARECAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSaoLinkedShareCapital(borrowingsModel: any) {
    return this.commonHttpService.post(borrowingsModel,Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS+ ERP_TRANSACTION_CONSTANTS.SAO_BORROWING_LINKED_SHARECAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSaoLinkedShareCapitalById(id: any) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_BORROWING_LINKED_SHARECAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSaoLinkedShareCapital(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_BORROWING_LINKED_SHARECAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSaoLinkedShareCapital(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_BORROWING_LINKED_SHARECAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 
  getSaoLinkedShareCapitalByProductId(productId: string){
    let headers = new HttpHeaders({ 'productId': productId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_BORROWING_LINKED_SHARECAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.BORROWING_LINLED_SHARECAPITAL_CONFIG_GET_BY_PRODUCT_ID);
  }

}
