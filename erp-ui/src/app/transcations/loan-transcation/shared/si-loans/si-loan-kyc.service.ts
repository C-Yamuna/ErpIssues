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
export class SiLoanKycService {

  private organizationDetailsStepper = new BehaviorSubject<stepperDataModel>(null);
  public currentStep = this.organizationDetailsStepper.asObservable();

  public resetCurrentStep() {
    this.organizationDetailsStepper.next(null); // or initial value
  }
  
  constructor(private commonHttpService: CommonHttpService) { }

  changeData(data: stepperDataModel) {
    this.organizationDetailsStepper.next(data)
  }

  updateSILoanKYCDetails(object: any) {
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSILoanKYCDetails(object: any) {
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllSILoanKYCDetails() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSILoanKYCDetails(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSILoanKYCDetails(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  getAllKYCTypes() {
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.KYC_DOC_TYPE + Configuration.GET_ALL);
  }

  getAllSILoanKYCDetailsByAdmissionNumber(admisionNumber: any) {
    let headers = new HttpHeaders({ 'admissionNumber': admisionNumber + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_SI_LOAN_KYC_DETAILS_BY_ADMISSION_NUMBER);
  }

  getSILoanKYCDetailsByLoanAccId(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_SI_LOAN_KYC_DETAILS_BY_LOAN_ID);
  }

  getSILoanApplicationWithKycDetailsByLoanAccId(loanAccId: any) {
    let headers = new HttpHeaders({ 'loanAccId': loanAccId + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_APPLICATION + ERP_TRANSACTION_CONSTANTS.GET_LOAN_APPLICATION_DETAILS_BY_LOAN_APPLICATION_ID);
  }

}
