import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SiLinkedShareCapitalService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateSiLinkedShareCapital(borrowingsModel: any) {
    return this.commonHttpService.put(borrowingsModel,Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS+ ERP_TRANSACTION_CONSTANTS.SI_BORROWING_LINKED_SHARECAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSiLinkedShareCapital(borrowingsModel: any) {
    return this.commonHttpService.post(borrowingsModel,Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS+ ERP_TRANSACTION_CONSTANTS.SI_BORROWING_LINKED_SHARECAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSiLinkedShareCapitalById(id: any) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_LINKED_SHARECAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSiLinkedShareCapital(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_LINKED_SHARECAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSiLinkedShareCapital(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_LINKED_SHARECAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 
  getSiLinkedShareCapitalByProductId(productId: string){
    let headers = new HttpHeaders({ 'productId': productId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_LINKED_SHARECAPITAL_CONFIG + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_LINKED_SHARECAPITAL_CONFIG_GET_BY_SI_PRODUCTID);
  }
}
