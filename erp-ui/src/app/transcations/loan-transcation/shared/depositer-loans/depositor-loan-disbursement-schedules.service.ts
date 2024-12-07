import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class DepositorLoanDisbursementSchedulesService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateDepositorLoanDisbursementSchedules(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.DEPOSITER_LOAN_DISBURSEMENT_SCHEDULES + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addDepositorLoanDisbursementSchedules(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.DEPOSITER_LOAN_DISBURSEMENT_SCHEDULES + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getDepositorLoanLinkedSharecapitalConfigsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITER_LOAN_DISBURSEMENT_SCHEDULES + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllDepositorLoanDisbursementSchedules(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITER_LOAN_DISBURSEMENT_SCHEDULES + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteDepositorLoanDisbursementSchedules(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITER_LOAN_DISBURSEMENT_SCHEDULES + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getDepositerLoanDisbursementScheduleByLoanApplicationId(productId: string) {
    let headers = new HttpHeaders({ 'productId': productId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITER_LOAN_DISBURSEMENT_SCHEDULES + ERP_TRANSACTION_CONSTANTS.GET_DEPOSITER_LOAN_DISBURSEMENT_SCHEDULE_BY_LOAN_APPLICATION_ID);
  }
}
