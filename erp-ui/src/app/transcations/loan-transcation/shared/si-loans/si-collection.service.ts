import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { Configuration } from 'src/app/configurations/configurations-constants';
@Injectable({
  providedIn: 'root'
})
export class SiCollectionService {
  constructor(private commonHttpService: CommonHttpService) { }

  updateSICollection(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SI_COLLECTION + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSICollection(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SI_COLLECTION + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSICollectionById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_COLLECTION + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSICollection(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_COLLECTION + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSICollection(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_COLLECTION + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  approvalSICollectionDetails(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SI_COLLECTION + ERP_TRANSACTION_CONSTANTS.APPROVAL_SI_COLLECTION_DETAILS)
  }
  getDemand(AccountNumber: string) {
    let headers = new HttpHeaders({ 'AccountNumber': AccountNumber + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_COLLECTION + ERP_TRANSACTION_CONSTANTS.GET_DEMAND);
  }
  getSICollectionByApplicationId(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_COLLECTION + ERP_TRANSACTION_CONSTANTS.GET_SI_LOAN_COLLECTIONS_BY_APPLICATION);
  }
}
