import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { stepperDataModel } from './si-loan-application.service';

@Injectable({
  providedIn: 'root'
})
export class SiLoanGuardianService {

  private organizationDetailsStepper = new BehaviorSubject<stepperDataModel>(null);
  public currentStep = this.organizationDetailsStepper.asObservable();

  constructor(private commonHttpService: CommonHttpService) { }

  changeData(data: stepperDataModel) {
    this.organizationDetailsStepper.next(data)
  }

  updateSILoanGuardianDetails(loansModel: any) {
    return this.commonHttpService.put(loansModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_GUARDIAN_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSILoanGuardianDetails(loansModel: any) {
    return this.commonHttpService.post(loansModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_GUARDIAN_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSILoanGuardianDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_GUARDIAN_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSILoanGuardianDetails() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_GUARDIAN_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSILoanGuardianDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_GUARDIAN_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getGuardianDetailsByLoanAccId(loanAccId: any) {
    let headers = new HttpHeaders({ 'loanAccId': loanAccId + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_GUARDIAN_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_SI_LOAN_GURADIAN_DETAILS_BY_LOAN_ACC_ID);
  }
}
