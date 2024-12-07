import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class FdNonCumulativeKycService {

  constructor(private commonHttpService : CommonHttpService) { }

  getAllKycTypes(){
    return this.commonHttpService.getAll(Configuration.TERMDEPOSITS + Configuration.DOC_TYPES + Configuration.GET_ALL);
  }

  getKycById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_NON_CUMULATIVE_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  updateKyc(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_NON_CUMULATIVE_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addKyc(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_NON_CUMULATIVE_KYC_DETAILS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  deleteKyc(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_NON_CUMULATIVE_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getfdNonKycByfdAccId(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_NON_CUMULATIVE_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_KYC_DETAILS_BY_TERM_ACCOUNT_ID);
  }
  getMemberKycByAddmissionNumber(admisionNumber: any){
    let headers = new HttpHeaders({ 'admissionNumber': admisionNumber + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_NON_CUMULATIVE_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_KYC_BY_ACCOUNT_ID_AND_MEMBER_ID_AND_ADMISSION_NUMBER);
  }
  getKycByfdAccId(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_NON_CUMULATIVE_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_KYC_DETAILS_BY_ACCOUNT_ID);
  }
}
