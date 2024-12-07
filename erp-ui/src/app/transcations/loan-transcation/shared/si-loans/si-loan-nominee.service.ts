import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { stepperDataModel } from './si-loan-application.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SiLoanNomineeService {

  private organizationDetailsStepper = new BehaviorSubject<stepperDataModel>(null);
  public currentStep = this.organizationDetailsStepper.asObservable();
  
  constructor(private commonHttpService:CommonHttpService) { }

  changeData(data: stepperDataModel) {
    this.organizationDetailsStepper.next(data)
  }
  
  updateSILoanNomineeDetails(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SI_LOAN_NOMINEE_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSILoanNomineeDetails(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SI_LOAN_NOMINEE_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSILoanNomineeDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_NOMINEE_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSILoanNomineeDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_NOMINEE_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSILoanNomineeDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_NOMINEE_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  getNomineeDetailsBySILoanLoanAccId(id : any){
    let headers = new HttpHeaders({ 'sbAccId': id + '', })
    return this.commonHttpService.getById( headers, Configuration.LOANS + Configuration.SB_ACC_NOMINEE_DETAILS + Configuration.SB_NOMINEE_DETAILS_BY_SB_ACC_ID);
  }

  getNomineeFromMemberModuleByAdmissionNumber(admissionNumber: any){
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_NOMINEE_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_NOMINEE_BY_ADMISSION_NUMBER);
  }
  
  getSILoanNomineeDetailsByLoanAccId(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_NOMINEE_DETAILS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_NOMINEE_DETAILS_BY_ACCOUNT_ID);
  }
  
  getGuardianDetails(accountNumber : any){
    let headers = new HttpHeaders({ 'accountNumber': accountNumber + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_CO_APPLICANT_DETAILS + ERP_TRANSACTION_CONSTANTS.SI_LOAN__ACC_GUARDIAN_GET_BY_ACCOUNT_NUMBER);
  }

  getGardianFromMemberModuleByAdmissionNumber(admissionNumber: any){
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBER_GUARDIAN_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_GUARDAIN_BY_ADMISSION_NUMBER);
  }
  
}
