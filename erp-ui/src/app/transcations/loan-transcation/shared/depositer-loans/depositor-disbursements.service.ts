import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class DepositorDisbursementsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateDepositorDisbursements(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.DEPOSITER_DISBURSEMENTS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addDepositorDisbursements(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.DEPOSITER_DISBURSEMENTS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getDepositorDisbursementsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITER_DISBURSEMENTS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllDepositorDisbursements(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITER_DISBURSEMENTS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteDepositorDisbursements(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITER_DISBURSEMENTS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  depositor_disbursementApproval(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.DEPOSITER_DISBURSEMENTS + ERP_TRANSACTION_CONSTANTS.DEPOSITER_DISBURSEMENT_APPROVAL)
}
}