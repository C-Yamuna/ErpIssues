import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class CiChargesService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateCiCharges(chargesModel:any){
    return this.commonHttpService.put(chargesModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addCiCharges(chargesModel:any){
    return this.commonHttpService.post(chargesModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_PRODUCT_CHARGES_CONFIG+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllCiCharges(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getCiChargesById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteCiCharges(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getCiChargesByProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_CI_PRODUCT_CHARGES_CONFIG_BY_CI_PRODUCT_ID);
  }
}
