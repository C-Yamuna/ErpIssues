import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';
import { TermDepostModel } from './term-depost-model.model';
import { Configuration } from 'src/app/configurations/configurations-constants';

@Injectable({
  providedIn: 'root'
})
export class RdAccountKycService {

  constructor(private commonHttpService : CommonHttpService) { }
  updateRdAccountKyc(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_KYC + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addRdAccountKyc(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_KYC + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getAllRdAccountKyc() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_KYC + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getRdAccountKyc(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_KYC + ERP_TRANSACTION_CONSTANTS.GET)
  }
  getKycDetailsByTermAccountId(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_KYC + ERP_TRANSACTION_CONSTANTS.GET_KYC_DETAILS_BY_TERM_ACCOUNT_ID)
  }
  getByAccountIdAndNumberIdAndMemberType(id: string , memberTypeId: string,membershipId :string) {
    let headers = new HttpHeaders({ 'id': id + '' ,'memberTypeId': memberTypeId+'','membershipId': membershipId+''})
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_KYC + ERP_TRANSACTION_CONSTANTS.GET_BY_ACCOUNT_ID_AND_NUMBER_ID_AND_MEMBER_TYPE)
  }
  getByAccountIdAndAdmissionNumber(id: string , memberTypeId: string,admissionNumber :string) {
    let headers = new HttpHeaders({ 'id': id + '' ,'memberTypeId': memberTypeId+'','admissionNumber': admissionNumber+''})
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_KYC + ERP_TRANSACTION_CONSTANTS.GET_BY_ACCOUNT_ID_AND_MEMBER_ID_AND_ADMISSION_NUMBER)
  }
  deleteRdAccountKyc(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_KYC + ERP_TRANSACTION_CONSTANTS.DELETE)
  }

  getAllKycTypes(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.KYC_DOC_TYPE + Configuration.GET_ALL);
  }

  getKycDetailsByAdmissionNumber(admissionNumber: any) {
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_KYC + ERP_TRANSACTION_CONSTANTS.GET_ALL_RD_ACC_KYC_DETAILS_BY_ADMISSION_NUMBER)
  }
}
