import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SbCommunicationService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSbCommunications(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_COMMUNICATIONS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSbCommunications(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_COMMUNICATIONS + ERP_TRANSACTION_CONSTANTS.ADD);
  }
  
  getCommunicationDetailsBySbAccountIdAndCommunicationTypeId(id: any,communicationTypeId:any){
    let headers = new HttpHeaders({'id': id + '', 'communicationTypeId': communicationTypeId + ''})
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_COMMUNICATIONS + ERP_TRANSACTION_CONSTANTS.GET_COMMUNICATION_DETAILS_BY_SB_ACCOUNT_ID_AND_COMMUNICATIONTYPE);
  }

  getCommunicationDetailsByAccountIdAndMemberTypeAndAdmissionNumber(id: any,memberTypeId:any,memberId:any){
    let headers = new HttpHeaders({ 'id': id + '', 'memberTypeId': memberTypeId + '', 'memberId': memberId + ''})
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_COMMUNICATIONS + ERP_TRANSACTION_CONSTANTS.GET_COMMUNICATION_BY_ACCOUNT_ID_AND_MEMBER_TYPE_AND_MEMBER_ID);
  }

  getCommunicationByAccountIdAndMemberTypeAndMemberId(id: any,memberTypeId:any,admissionNumber:any){
    let headers = new HttpHeaders({ 'id': id + '', 'memberTypeId': memberTypeId + '', 'admissionNumber': admissionNumber + ''})
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_COMMUNICATIONS + ERP_TRANSACTION_CONSTANTS.GET_COMMUNICATION_BY_ACCOUNT_ID_AND_MEMBER_TYPE_AND_ADMISSION_NUMBER);
  }

  getBySbAccIdOrJointHolderId(id: any){
    let headers = new HttpHeaders({ 'id': id + ''})
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_COMMUNICATIONS + ERP_TRANSACTION_CONSTANTS.GET_BY_SB_ACC_ID_OR_JOINT_HOLDER_ID);
  }

  getAllSbCommunications(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_COMMUNICATIONS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSbCommunicationsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_COMMUNICATIONS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSbCommunications(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_COMMUNICATIONS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
 