import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { BehaviorSubject } from 'rxjs';
import { stepperDataModel } from './si-loan-application.service';
import { Configuration } from 'src/app/configurations/configurations-constants';
@Injectable({
  providedIn: 'root'
})
export class SiLoanGuarantorDetailsService {
  private organizationDetailsStepper = new BehaviorSubject<stepperDataModel>(null);
  public currentStep = this.organizationDetailsStepper.asObservable();

  constructor(private commonHttpService: CommonHttpService) { }

  changeData(data: stepperDataModel) {
    this.organizationDetailsStepper.next(data)
  }

  updateSILoanGuarantorDetails(loansModel: any) {
    return this.commonHttpService.put(loansModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_GUARANTOR_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSILoanGuarantorDetails(loansModel: any) {
    return this.commonHttpService.post(loansModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_GUARANTOR_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSILoanGuarantorDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_GUARANTOR_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSILoanGuarantorDetails() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_GUARANTOR_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSILoanGuarantorDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_GUARANTOR_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  getMemberByAdmissionNumber(admissionNumber: any) {
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '', })
    return this.commonHttpService.getById(headers, Configuration.LOANS + Configuration.INDIVIDUAL_MEMBER_DETAILS + Configuration.MEMBER_BY_ADMISSIONUMBER);
  }

  getInstitutionDetailsByAdmissionNumber(admissionNumber: any) {
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '', })
    return this.commonHttpService.getById(headers, Configuration.LOANS + Configuration.INSTITUTION + Configuration.MEMBER_BY_ADMISSIONUMBER);
  }

  getGroupByAdmissionNumber(admissionNumber: any) {
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '', })
    return this.commonHttpService.getById(headers, Configuration.LOANS + Configuration.GROUP + Configuration.MEMBER_BY_ADMISSIONUMBER);
  }

  getInstitutionDetails(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers, Configuration.LOANS + Configuration.INSTITUTION + Configuration.GET);
  }

  getSILoanGuarantorDetailsByLoanAccId(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_GUARANTOR_DETAILS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_GUARANTOR_DETAILS_BY_ACCOUNT_ID);
  }

  saveGuarantorDetailsList(guarantorDetails: any) {
    let headers = new HttpHeaders({})
    return this.commonHttpService.post(guarantorDetails, headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_GUARANTOR_DETAILS + ERP_TRANSACTION_CONSTANTS.SAVE_GUARANTOR_DETAILS_LIST);
  }

}
