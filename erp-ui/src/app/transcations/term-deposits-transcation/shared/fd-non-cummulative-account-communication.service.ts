import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class FdNonCummulativeAccountCommunicationService {

  constructor(private commonHttpService : CommonHttpService) { }

  updateFdNonCummulativeAccountCommunication(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNT_COMMUNICATION+ ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addFdNonCummulativeAccountCommunication(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getCommunicationDetailsByFdNonCummlativeAccountIdAndMemberId(id: any,memberTypeId:any,membershipId:any) {
    let headers = new HttpHeaders({ 'id': id + '','memberTypeId': memberTypeId + '','membershipId': membershipId + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.GET_COMMUNICATION_DETAILS_BY_FD_NON_CUMMLATIVE_ACCOUNT_ID_AND_MEMBER_ID)
  }

  getCommunicationDetailsByFdNonCummlativeAccountIdAndCommunicationType(id: any,communicationTypeId:any) {
    let headers = new HttpHeaders({ 'id': id + '','communicationTypeId': communicationTypeId + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.GET_COMMUNICATION_DETAILS_BY_FD_NON_CUMMLATIVE_ACCOUNT_ID_AND_COMMUNICATION_TYPE)
  }

  getCommunicationDetailsByFdNonCummlativeAccountIdAndAdmissionNumber(id: any,memberTypeId:any,admissionNumber:any) {
    let headers = new HttpHeaders({ 'id': id + '','memberTypeId': memberTypeId + '','admissionNumber': admissionNumber + ''})
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.GET_COMMUNICATION_DETAILS_BY_FD_NON_CUMMLATIVE_ACCOUNT_ID_AND_ADMISSION_NUMBER)
  }

  getCommunicationByTermAccountId(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.GET_COMMUNICATION_BY_TERM_ACCOUNT_ID)
  }

  getAllFdNonCummulativeAccountCommunication() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getFdNonCummulativeAccountCommunicationById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.GET)
  }
  deleteFdNonCummulativeAccountCommunication(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.DELETE)
  }
}
