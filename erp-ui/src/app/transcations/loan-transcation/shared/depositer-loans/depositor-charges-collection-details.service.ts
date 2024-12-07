import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class DepositorChargesCollectionDetailsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateDepositorChargesCollectionDetails(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.DEPOSITOR_CHARGES_COLLECTION_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addDepositorChargesCollectionDetails(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.DEPOSITOR_CHARGES_COLLECTION_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getDepositorChargesCollectionDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITOR_CHARGES_COLLECTION_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllDepositorChargesCollectionDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITOR_CHARGES_COLLECTION_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteDepositorChargesCollectionDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITOR_CHARGES_COLLECTION_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
