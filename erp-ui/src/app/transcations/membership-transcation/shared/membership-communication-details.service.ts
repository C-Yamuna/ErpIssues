import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class MembershipCommunicationDetailsService {


  constructor(private commonHttpService: CommonHttpService) { }
  
  updateMembershipCommunicationDetails(MembershipModel: any) {
    return this.commonHttpService.put(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addMembershipCommunicationDetails(MembershipModel: any) {
    return this.commonHttpService.post(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getMembershipCommunicationDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllMembershipCommunicationDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteMembershipCommunicationDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getMembershipCommunicationDetailsByMemberIdAndPacsId(memberId: any, pacsId: any,branchId: any) {
    let headers = new HttpHeaders({ 'memberId': memberId+'', 'pacsId': pacsId+'','branchId': branchId+''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.GET_MEMBER_COMMUNICATION_DETAILS_BY_MEMBERSHIP_ID_AND_PACS_ID);
  }
}
