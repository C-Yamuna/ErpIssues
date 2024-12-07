import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class FdCummulativeAccountCommunicationService {
  constructor(private commonHttpService: CommonHttpService) { }

  updateFdCummulativeAccountCommunication(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addFdCummulativeAccountCommunication(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getFdCummulativeAccountCommunicationById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllFdCummulativeAccountCommunication(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteFdCummulativeAccountCommunication(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 getCommunicationDetailsByFdCummulativeAccountIdAndCommunicationTyoeAndAdmissionNumber(memberTypeId: string , id: string , admissionNumber: string) {
    let headers = new HttpHeaders({ 'memberTypeId': memberTypeId + '' , 'id':id +'', 'admissionNumber':admissionNumber+ ''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.GET_COMMUNICATION_DETAILS_BY_FD_CUMULATIVE_ACCOUNT_ID_AND_COMMUNICATIONTYPE_AND_ADMISSION_NUMBER);
  }
    getCommunicationDetailsByFdCummulativeAccountIdAndCommunicationType(memberTypeId: string , id: string , membershipId: string) {
    let headers = new HttpHeaders({ 'memberTypeId': memberTypeId + '' , 'id':id +'', 'membershipId':membershipId+ ''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.GET_COMMUNICATION_DETAILS_BY_FD_CUMULATIVE_ACCOUNT_ID_AND_COMMUNICATIONTYPE);
  }
  getCommunicatioyFdCummulativeAccountId( id: string ) {
    let headers = new HttpHeaders({ 'id':id +''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.GET_COMMUNICATION_BY_FD_CUMMULATIVE_ACCOUNT_ID);
  }
}
