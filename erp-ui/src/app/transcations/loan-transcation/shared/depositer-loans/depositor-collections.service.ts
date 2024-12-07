import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class DepositorCollectionsService {
  constructor(private commonHttpService: CommonHttpService) { }

  updateDepositorCollections(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.DEPOSITOR_COLLECTIONS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addDepositorCollections(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.DEPOSITOR_COLLECTIONS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getDepositorCollectionsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITOR_COLLECTIONS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllDepositorCollections(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITOR_COLLECTIONS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteDepositorCollections(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITOR_COLLECTIONS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  approvalCiCollectiomDetails(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.DEPOSITOR_COLLECTIONS + ERP_TRANSACTION_CONSTANTS.APPROVAL_CI_COLLECTION_DETAILS)
  }
}