import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class SiDisbursementService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateSIDisbursement(loansModel: any) {
    return this.commonHttpService.put(loansModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_DISBURSEMENT + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  
  addSIDisbursement(loansModel: any) {
    return this.commonHttpService.post(loansModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_DISBURSEMENT + ERP_TRANSACTION_CONSTANTS.ADD)
  }

  getSIDisbursementById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_DISBURSEMENT + ERP_TRANSACTION_CONSTANTS.GET);
  }

  getAllSIDisbursement() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_DISBURSEMENT + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  deleteSIDisbursement(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_DISBURSEMENT + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  getSIDisbursementListByApplicationId(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_DISBURSEMENT + ERP_TRANSACTION_CONSTANTS.GET_SI_DISBURSEMENT_LIST_BY_APPLICATION_ID);
  }
}
