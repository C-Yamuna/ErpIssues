import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FdNonCummulativeAccountKycService {

  constructor(private commonHttpService : CommonHttpService) { }

  updateFdNonCummulativeAccountKyc(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNT_KYC+ ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addFdNonCummulativeAccountKyc(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNT_KYC + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getKycDetailsByTermAccountId(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNT_KYC + ERP_TRANSACTION_CONSTANTS.GET_KYC_DETAILS_BY_TERM_ACCOUNT_ID)
  }

  getKycByAccountIdAndMemberIdAndMemberType(id:any,memberTypeId:any,memberId:any){
    let headers = new HttpHeaders({ 'id': id + '','memberTypeId': memberTypeId + '','memberId': memberId + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNT_KYC + ERP_TRANSACTION_CONSTANTS.GET_KYC_BY_ACCOUNT_ID_AND_MEMBER_ID_AND_MEMBER_TYPE)
  }
  getKycByAccountIdAndMemberIdAndAdmissionNumber(id:any,memberTypeId:any,admissionNumber:any){
    let headers = new HttpHeaders({ 'id': id + '','memberTypeId': memberTypeId + '','admissionNumber': admissionNumber + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNT_KYC + ERP_TRANSACTION_CONSTANTS.GET_KYC_BY_ACCOUNT_ID_AND_MEMBER_ID_AND_ADMISSION_NUMBER)
  }
  getAllFdNonCummulativeAccountKyc() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNT_KYC + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getFdNonCummulativeAccountKycById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNT_KYC + ERP_TRANSACTION_CONSTANTS.GET)
  }
  deleteFdNonCummulativeAccountKyc(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNT_KYC + ERP_TRANSACTION_CONSTANTS.DELETE)
  }
}
