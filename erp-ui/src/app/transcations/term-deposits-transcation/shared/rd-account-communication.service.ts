import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';
import { TermDepostModel } from './term-depost-model.model';

@Injectable({
  providedIn: 'root'
})
export class RdAccountCommunicationService {

  constructor(private commonHttpService : CommonHttpService) { }
  updateRdAccountCommunication(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addRdAccountCommunication(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getAllRdAccountCommunication() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getRdAccountCommunication(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.GET)
  }
  getCommunicationDetailsRdAccountIdMemberIdAndMemberType(id: string , memberTypeId: string,membershipId: string,) {
    let headers = new HttpHeaders({ 'id': id + '' ,'memberTypeId': memberTypeId+'','membershipId': membershipId+''})
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.GET_COMMUNICATION_DETAILS_RD_ACCOUNT_ID_AND_MEMBER_ID_AND_MEMBER_TYPE)
  }
  getCommunicationDetailsByRdAccountIdAndCommunicatrionTypeAndAdmissionNumber(id: string , communicationTypeId: string,admissionNumber: string,) {
    let headers = new HttpHeaders({ 'id': id + '' ,'communicationTypeId': communicationTypeId+'','admissionNumber': admissionNumber+''})
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.GET_COMMUNICATION_DETAILS_BY_RD_ACCOUNT_ID_AND_COMMUNICATION_TYPE_AND_ADMISSION_NUMBER)
  }
  getCommunicatonByTermAccountId(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.GET_COMMUNICATION_BY_TERM_ACCOUNT_ID)
  }
  deleteRdAccountCommunication(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.DELETE)
  }
}
