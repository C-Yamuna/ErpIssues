import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class SiLoanDisbursementScheduleService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateSILoanDisbursementSchedule(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SI_LOAN_DISBURSEMENT_SCHEDULE + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSILoanDisbursementSchedule(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SI_LOAN_DISBURSEMENT_SCHEDULE + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSILoanDisbursementScheduleById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_DISBURSEMENT_SCHEDULE + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSILoanDisbursementSchedule(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_DISBURSEMENT_SCHEDULE + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSILoanDisbursementSchedule(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_DISBURSEMENT_SCHEDULE + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 getSILoanDisbursementScheduleByLoanApplicationId(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_DISBURSEMENT_SCHEDULE + ERP_TRANSACTION_CONSTANTS.GET_SI_LOAN_DISBURSEMENT_SCHEDULE_BY_LOAN_APPLICATION_ID);
  }
}
