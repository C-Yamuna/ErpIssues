import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';
import { TermDepostModel } from './term-depost-model.model';

@Injectable({
  providedIn: 'root'
})
export class RdReqiredDocumentsConfigService {

  constructor(private commonHttpService : CommonHttpService) { }
  updateReason(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_REQUIRED_DOCUMENT_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addReason(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_REQUIRED_DOCUMENT_CONFIG + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getAllReason() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_REQUIRED_DOCUMENT_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getReason(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_REQUIRED_DOCUMENT_CONFIG + ERP_TRANSACTION_CONSTANTS.GET)
  }
  deleteReason(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_REQUIRED_DOCUMENT_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE)
  }
  getRequiredDocumentsConfigByProductId(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_REQUIRED_DOCUMENT_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_REQUIRED_DOCUMENTS_CONFIG_BY_PRODUCT_ID)
  }
}
