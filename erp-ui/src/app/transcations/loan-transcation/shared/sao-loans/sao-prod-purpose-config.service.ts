import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class SaoProdPurposeConfigService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateSaoProdPurposeConfig(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SAO_PROD_PURPOSE_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSaoProdPurposeConfig(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SAO_PROD_PURPOSE_CONFIG + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSaoProdPurposeConfigById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_PROD_PURPOSE_CONFIG + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSaoProdPurposeConfig(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_PROD_PURPOSE_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSaoProdPurposeConfig(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_PROD_PURPOSE_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  
}
