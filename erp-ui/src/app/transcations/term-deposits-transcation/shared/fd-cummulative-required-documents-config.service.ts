import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class FdCummulativeRequiredDocumentsConfigService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateFdCummulativeRequiredDocumentsConfig(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_REQUIRED_DOCUMENTS_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addFdCummulativeRequiredDocumentsConfig(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_REQUIRED_DOCUMENTS_CONFIG + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getFdCummulativeRequiredDocumentsConfigById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_REQUIRED_DOCUMENTS_CONFIG + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllFdCummulativeRequiredDocumentsConfig(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_REQUIRED_DOCUMENTS_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteFdCummulativeRequiredDocumentsConfig(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_REQUIRED_DOCUMENTS_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 getRequiredDocumentsConfigByProductId(productId: string) {
    let headers = new HttpHeaders({ 'productId': productId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_REQUIRED_DOCUMENTS_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_REQUIRED_DOCUMENTS_CONFIG_BY_PRODUCT_ID);
  }
  
}
