import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class SiLoanNoticeDetailsService {
  constructor(private commonHttpService: CommonHttpService) { }

  updateSILoanNoticeDetails(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SI_LOAN_NOTICE_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSILoanNoticeDetails(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SI_LOAN_NOTICE_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSILoanNoticeDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_NOTICE_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSILoanNoticeDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_NOTICE_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSILoanNoticeDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_NOTICE_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 getSINoticeDetailsByLoanApplicationId(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_NOTICE_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_SI_NOTICE_DETAILS_BY_LOAN_APPLICATION_ID);
  }
}
