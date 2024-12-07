import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SbRequiredDocumentsService {

  constructor(private commonHttpService:CommonHttpService)  { }

  updateDocuments(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.REQUIRED_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addDocuments(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.REQUIRED_DOCUMENTS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllDocuments(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.REQUIRED_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getDocuments(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.REQUIRED_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteDocuments(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.REQUIRED_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getDocumentsBySbAccId(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.REQUIRED_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.REQUIRED_DOCUMENTS_BY_SB_ACC_ID);
  }
  getAllKycTypes(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.COMMON_MASTER + ERP_TRANSACTION_CONSTANTS.KYC_DOC_TYPE + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  
}
