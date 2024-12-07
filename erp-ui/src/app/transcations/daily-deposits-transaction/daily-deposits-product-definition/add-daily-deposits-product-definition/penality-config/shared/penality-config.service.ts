import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class PenalityConfigService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateProductPenalityConfig(object: any) {
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.DAILYDEPOSITS + ERP_TRANSACTION_CONSTANTS.PRODUCT_PENALITY_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addProductPenalityConfig(object: any) {
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.DAILYDEPOSITS + ERP_TRANSACTION_CONSTANTS.PRODUCT_PENALITY_CONFIG + ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllProductPenalityConfig() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.DAILYDEPOSITS + ERP_TRANSACTION_CONSTANTS.PRODUCT_PENALITY_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getProductPenalityConfigById(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.DAILYDEPOSITS + ERP_TRANSACTION_CONSTANTS.PRODUCT_PENALITY_CONFIG + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteProductPenalityConfig(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.DAILYDEPOSITS + ERP_TRANSACTION_CONSTANTS.PRODUCT_PENALITY_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  
}
