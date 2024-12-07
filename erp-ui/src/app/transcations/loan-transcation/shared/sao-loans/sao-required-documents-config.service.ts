import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class SaoRequiredDocumentsConfigService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateSaoRequiredDocumentsConfig(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SAO_REQUIRED_DOCUMENTS_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSaoRequiredDocumentsConfig(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SAO_REQUIRED_DOCUMENTS_CONFIG + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSaoRequiredDocumentsConfigById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_REQUIRED_DOCUMENTS_CONFIG + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSaoRequiredDocumentsConfig(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_REQUIRED_DOCUMENTS_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSaoRequiredDocumentsConfig(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_REQUIRED_DOCUMENTS_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 
}
