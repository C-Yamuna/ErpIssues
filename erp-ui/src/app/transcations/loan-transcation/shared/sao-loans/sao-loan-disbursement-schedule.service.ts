import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class SaoLoanDisbursementScheduleService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateSaoLoanDisbursementSchedule(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SAO_LOAN_DISBURSEMENT_SCHEDULE + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSaoLoanDisbursementSchedule(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SAO_LOAN_DISBURSEMENT_SCHEDULE + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSaoLoanDisbursementScheduleById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_DISBURSEMENT_SCHEDULE + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSaoLoanDisbursementSchedule(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_DISBURSEMENT_SCHEDULE + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSaoLoanDisbursementSchedule(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_DISBURSEMENT_SCHEDULE + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getSaoLoanDisbursementScheduleByLoanApplicationId(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_DISBURSEMENT_SCHEDULE + ERP_TRANSACTION_CONSTANTS.GET_SAO_LOAN_DISBURSEMENT_SCHEDULE_BY_LOAN_APPLICATION_ID);
  }
}