import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class GroupCommunicationDetailsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateGroupCommunicationDetails(MembershipModel: any) {
    return this.commonHttpService.put(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.GROUP_COMMUNICATION_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addGroupCommunicationDetails(MembershipModel: any) {
    return this.commonHttpService.post(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.GROUP_COMMUNICATION_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getGroupCommunicationDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.GROUP_COMMUNICATION_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllGroupCommunicationDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.GROUP_COMMUNICATION_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteGroupCommunicationDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.GROUP_COMMUNICATION_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getGroupCommunicationDetailsByGroupId(id: string,branchId: string , pacsId: string ) {
    let headers = new HttpHeaders({ 'id': id + '' ,'branchId': branchId+'', 'pacsId': pacsId+''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.GROUP_COMMUNICATION_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_GROUP_COMMUNICATION_DETAILS_BY_GROUP_ID);
  }
}
