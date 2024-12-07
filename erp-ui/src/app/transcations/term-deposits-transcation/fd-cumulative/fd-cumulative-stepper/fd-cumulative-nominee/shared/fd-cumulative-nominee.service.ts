import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class FdCumulativeNomineeService {

  constructor(private commonHttpService : CommonHttpService) { }

  getNomineeFromMemberModuleByAdmissionNumber(admissionNumber: any){
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_NOMINEE_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_NOMINEE_BY_ADMISSION_NUMBER);
  }

  getGardianFromMemberModuleByAdmissionNumber(admissionNumber: any){
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBER_GUARDIAN_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_GUARDAIN_BY_ADMISSION_NUMBER);
  }

  updateNomineeDetails(savingsBankNomineeModel:any){
    return this.commonHttpService.put(savingsBankNomineeModel, Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_NOMINEE_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addNomineeDetails(savingsBankNomineeModel:any){
    return this.commonHttpService.post(savingsBankNomineeModel, Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_NOMINEE_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD);
  }

  addGuardinaDetails(memberGuardianDetailsModelDetails : any){
    return this.commonHttpService.post(memberGuardianDetailsModelDetails, Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_GUARDAIN_DETAILS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  updateGuardainDetails(memberGuardianDetailsModelDetails : any){
    return this.commonHttpService.put(memberGuardianDetailsModelDetails, Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_GUARDAIN_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  getNomineeFromMembeshipByAdmissionNumber(admissionNumber: any) {
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_BASIC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_MEMBER_BY_ADMISSION_NUMBER);
  }


  getNomineeDetailsByFdAccId(id : any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNT_NOMINEE + ERP_TRANSACTION_CONSTANTS.GET_NOMINEE_BY_FD_CUMULATIVE_ACCOUNT_ID);
  }

  getGuardianDetails(accountNumber : any){
    let headers = new HttpHeaders({ 'accountNumber': accountNumber + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_ACCOUNT_GAURDIAN + ERP_TRANSACTION_CONSTANTS.GET_GAURDIAN_DETAILS_BY_FD_CUMULATIVE_ACCOUNT_ID);
  }
}
