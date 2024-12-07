import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class SaoProdCollateralsConfigService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateSaoProdCollateralsConfig(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SAO_PROD_COLLATERALS_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSaoProdCollateralsConfig(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SAO_PROD_COLLATERALS_CONFIG + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSaoProdCollateralsConfigById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_PROD_COLLATERALS_CONFIG + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSaoProdCollateralsConfig(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_PROD_COLLATERALS_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSaoProdCollateralsConfig(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_PROD_COLLATERALS_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
