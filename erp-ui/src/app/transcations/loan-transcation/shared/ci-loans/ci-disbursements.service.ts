import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class CiDisbursementsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateCiDisbursements(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.CI_DISBURSEMENTS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addCiDisbursements(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.CI_DISBURSEMENTS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getCiDisbursementsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_DISBURSEMENTS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllCiDisbursements(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_DISBURSEMENTS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteCiDisbursements(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_DISBURSEMENTS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  ciDisbursementApproval(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.CI_DISBURSEMENTS + ERP_TRANSACTION_CONSTANTS.CI_DISBURSEMENT_APPROVAL)
  }
}
