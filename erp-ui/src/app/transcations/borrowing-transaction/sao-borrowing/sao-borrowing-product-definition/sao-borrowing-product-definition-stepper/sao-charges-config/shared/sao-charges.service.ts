import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SaoChargesService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateSaoCharges(borrowingsModel: any) {
    return this.commonHttpService.put(borrowingsModel,Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS+ ERP_TRANSACTION_CONSTANTS.SAO_PRODUCT_CHARGES_CONFIGS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSaoCharges(borrowingsModel: any) {
    return this.commonHttpService.post(borrowingsModel,Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS+ ERP_TRANSACTION_CONSTANTS.SAO_PRODUCT_CHARGES_CONFIGS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSaoChargesById(id: any) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_PRODUCT_CHARGES_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSaoCharges(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_PRODUCT_CHARGES_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSaoCharges(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_PRODUCT_CHARGES_CONFIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 
  getSaoChargesByProductId(productId: string){
    let headers = new HttpHeaders({ 'productId': productId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_PRODUCT_CHARGES_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_PRODUCT_CHARGES_CONFIG_LIST_BY_PRODUCT_ID);
  }

}
