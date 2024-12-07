import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class CiCollectionsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateCiCollections(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.CI_COLLECTIONS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addCiCollections(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.CI_COLLECTIONS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getCiCollectionsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_COLLECTIONS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllCiCollections(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_COLLECTIONS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteCiCollections(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_COLLECTIONS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getDemand(accountNumber: string) {
    let headers = new HttpHeaders({ 'accountNumber': accountNumber + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_COLLECTIONS + ERP_TRANSACTION_CONSTANTS.GET_DEMAND);
  }
  approvalCiCollectionDetails(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.CI_COLLECTIONS + ERP_TRANSACTION_CONSTANTS.APPROVAL_CI_COLLECTION_DETAILS)
  }
}
