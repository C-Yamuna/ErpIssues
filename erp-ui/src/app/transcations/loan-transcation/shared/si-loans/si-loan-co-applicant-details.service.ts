import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class SiLoanCoApplicantDetailsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateSILoanCoApplicantDetails(loansModel: any) {
    return this.commonHttpService.put(loansModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_CO_APPLICANT_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }

  addSILoanCoApplicantDetails(loansModel: any) {
    return this.commonHttpService.post(loansModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_CO_APPLICANT_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }

  getSILoanCoApplicantDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_CO_APPLICANT_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  getAllSILoanCoApplicantDetails() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_CO_APPLICANT_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  deleteSILoanCoApplicantDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_CO_APPLICANT_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  getSILoanCoApplicantByLoanApplicationId(loanApplicationId: string) {
    let headers = new HttpHeaders({ 'loanApplicationId': loanApplicationId + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_CO_APPLICANT_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_SI_LOAN_CO_APPLICANT_BY_LOAN_APPLICATION_ID);
  }

  saveJointHolderListSave(jointHolderList: any) {
    let headers = new HttpHeaders({})
    return this.commonHttpService.post(jointHolderList, headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_CO_APPLICANT_DETAILS + ERP_TRANSACTION_CONSTANTS.SAVE_JOINT_HOLDER_LIST);
  }

}
