import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class DepositorLoanApplicationsService {
  constructor(private commonHttpService: CommonHttpService) { }

  updateDepositorLoanApplications(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.DEPOSITOR_LOAN_APPLICATIONS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addDepositorLoanApplications(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.DEPOSITOR_LOAN_APPLICATIONS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getDepositorLoanApplicationsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITOR_LOAN_APPLICATIONS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllDepositorLoanApplications(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITOR_LOAN_APPLICATIONS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteDepositorLoanApplications(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITOR_LOAN_APPLICATIONS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  depositerLoanApplicationApproval(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.DEPOSITOR_LOAN_APPLICATIONS + ERP_TRANSACTION_CONSTANTS.DEPOSITOR_LOAN_APPLICATION_APPROVAL)
  }
 getLoanApplicationDetailsByLoanApplicationId(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.DEPOSITOR_LOAN_APPLICATIONS + ERP_TRANSACTION_CONSTANTS.GET_LOAN_APPLICATION_DETAILS_BY_LOAN_APPLICATION_ID);
  }
}
