import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class TermCollectionsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateTermCollections(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.TERM_COLLECTIONS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addTermCollections(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.TERM_COLLECTIONS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getTermCollectionsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_COLLECTIONS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllTermCollections(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_COLLECTIONS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteTermCollections(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_COLLECTIONS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 approvalTermCollectionDetails(loansModel: any)  {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.TERM_COLLECTIONS + ERP_TRANSACTION_CONSTANTS.APPROVAL_TERM_COLLECTION_DETAILS) 
   }
   getDemandByAccountNumber(id: string , accountNumber: string) {
    let headers = new HttpHeaders({ 'id': id + '','accountNumber':accountNumber+'' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_COLLECTIONS + ERP_TRANSACTION_CONSTANTS.GET_DEMAND_BY_ACCOUNT_NUMBER);
  }
}
