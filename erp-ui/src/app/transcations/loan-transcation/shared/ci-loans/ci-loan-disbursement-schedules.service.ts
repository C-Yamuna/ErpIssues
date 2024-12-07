import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class CiLoanDisbursementSchedulesService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateCiLoanDisbursementSchedules(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.CI_LOAN_DISBURSEMENT_SCHEDULES + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addCiLoanDisbursementSchedules(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.CI_LOAN_DISBURSEMENT_SCHEDULES + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getCiLoanDisbursementSchedulesById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_LOAN_DISBURSEMENT_SCHEDULES + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllCiLoanDisbursementSchedules(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_LOAN_DISBURSEMENT_SCHEDULES + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteCiLoanDisbursementSchedules(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_LOAN_DISBURSEMENT_SCHEDULES + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getCiLoanDisbursementScheduleByLoanApplicationId(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_LOAN_DISBURSEMENT_SCHEDULES + ERP_TRANSACTION_CONSTANTS.GET_CI_LOAN_DISBURSEMENT_SCHEDULE_BY_LOAN_APPLICATION_ID);
  }
}
