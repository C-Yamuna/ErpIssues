import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SavingsBankNomineeService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSbNominee(object:any){
    return this.commonHttpService.put(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.SB_ACC_NOMINEE_DETAILS + Configuration.UPDATE);
  }

  addSbNominee(object:any){
    return this.commonHttpService.post(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.SB_ACC_NOMINEE_DETAILS+ Configuration.ADD);
  }

  getAllSbNominee(){
    return this.commonHttpService.getAll(Configuration.DEMANDDEPOSITS + Configuration.SB_ACC_NOMINEE_DETAILS + Configuration.GET_ALL);
  }

  getSbNominee(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.DEMANDDEPOSITS + Configuration.SB_ACC_NOMINEE_DETAILS + Configuration.GET);
  }

  deleteSbNominee(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.DEMANDDEPOSITS + Configuration.SB_ACC_NOMINEE_DETAILS + Configuration.DELETE);
  }

  getNomineeDetailsBySbAccId(id : any){
    let headers = new HttpHeaders({ 'sbAccId': id + '', })
    return this.commonHttpService.getById( headers, Configuration.DEMANDDEPOSITS + Configuration.SB_ACC_NOMINEE_DETAILS + Configuration.SB_NOMINEE_DETAILS_BY_SB_ACC_ID);
  }

  addGuardinaDetails(object : any){
    return this.commonHttpService.post(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.SB_ACC_GUARDAIN_DETAILS+ Configuration.ADD);
  }

  updateGuardainDetails(object : any){
    return this.commonHttpService.put(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.SB_ACC_GUARDAIN_DETAILS + Configuration.UPDATE);
  }
  getGuardianDetails(accountNumber : any){
    let headers = new HttpHeaders({ 'accountNumber': accountNumber + '', })
    return this.commonHttpService.getById( headers, Configuration.DEMANDDEPOSITS + Configuration.SB_ACC_GUARDAIN_DETAILS + Configuration.SB_ACC_GUARDIAN_GET_BY_ACCOUNT_NUMBER);
  }
  getNomineeFromMemberModuleByAdmissionNumber(admissionNumber: any){
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_NOMINEE_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_NOMINEE_BY_ADMISSION_NUMBER);
  }

  getGardianFromMemberModuleByAdmissionNumber(admissionNumber: any){
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBER_GUARDIAN_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_GUARDAIN_BY_ADMISSION_NUMBER);
  }
  
  getNomineeDetailsBySbAccountNumber(accountNumber : any){
    let headers = new HttpHeaders({ 'accountNumber': accountNumber + '', })
    return this.commonHttpService.getById( headers, Configuration.DEMANDDEPOSITS + Configuration.SB_ACC_NOMINEE_DETAILS + Configuration.GET_SB_NOMINEE_BY_ACCOUNT_NUMBER);
  }
}
