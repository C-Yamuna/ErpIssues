import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class FdCummulativeAccountKycService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateFdCummulativeAccountKyc(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_ACCOUNT_KYC + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addFdCummulativeAccountKyc(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_ACCOUNT_KYC + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getFdCummulativeAccountKycById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_ACCOUNT_KYC + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllFdCummulativeAccountKyc(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_ACCOUNT_KYC + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteFdCummulativeAccountKyc(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_ACCOUNT_KYC + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 getKycDetailsByFdCummulativeAccountIdMemberTypeAndAdmissionNumber(membershipTypeId: string ,id: any , admissionNumber: string) {
    let headers = new HttpHeaders({ 'membershipTypeId': membershipTypeId + '' , 'id': id+'' , admissionNumber : admissionNumber+''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_ACCOUNT_KYC + ERP_TRANSACTION_CONSTANTS.GET_KYC_DETAILS_BY_FD_CUMULATIVE_ACCOUNT_ID_MEMBER_TYPE_AND_ADMISSION_NUMBER);
  }
  getKycDetailsByFdCummulativeAccountIdAndMemTypeMemberId(membershipId: string ,id: any , memberTypeId: string) {
    let headers = new HttpHeaders({ 'membershipId': membershipId + '' , 'id': id+'' , memberTypeId : memberTypeId+''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_ACCOUNT_KYC + ERP_TRANSACTION_CONSTANTS.GET_KYC_DETAILS_BY_FD_CUMULATIVE_ACCOUNT_ID_AND_MEM_TYPE_MEMBER_ID);
  }
  getKycDetailsByFdCummulativeAccountId(id: any ) {
    let headers = new HttpHeaders({ 'id': id+'' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_ACCOUNT_KYC + ERP_TRANSACTION_CONSTANTS.GET_KYC_DETAILS_BY_FD_CUMULATIVE_ACCOUNT_ID);
  }
}
