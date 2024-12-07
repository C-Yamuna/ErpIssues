import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SaoLoanProductChargesService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSaoProductCharges(chargesModel:any){
    return this.commonHttpService.put(chargesModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSaoProductCharges(chargesModel:any){
    return this.commonHttpService.post(chargesModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_PRODUCT_CHARGES_CONFIG+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllSaoProductCharges(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSaoProductChargesById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSaoProductCharges(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getSaoInterestPolicyConfigByProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_PRODUCT_CHARGES_CONFIG + ERP_TRANSACTION_CONSTANTS.SAO_GET_BY_PRODUCT_ID);
  }
}
