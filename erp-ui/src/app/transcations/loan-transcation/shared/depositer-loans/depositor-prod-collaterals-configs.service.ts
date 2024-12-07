import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class DepositorProdCollateralsConfigsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateDepositorProdCollateralsConfigs(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.DEPOSITER_PROD_COLLATERALS_CONFIGS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addDepositorProdCollateralsConfigs(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.DEPOSITER_PROD_COLLATERALS_CONFIGS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getDepositorProdCollateralsConfigsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITER_PROD_COLLATERALS_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllDepositorProdCollateralsConfigs(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITER_PROD_COLLATERALS_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteDepositorProdCollateralsConfigs(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITER_PROD_COLLATERALS_CONFIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 getDepositerProdCollateralsConfigByCiProductId(productId: string ) {
    let headers = new HttpHeaders({ 'productId': productId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITER_PROD_COLLATERALS_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_DEPOSITER_PROD_COLLATERALS_CONFIG_BY_CI_PRODUCT_ID);
  }
}
