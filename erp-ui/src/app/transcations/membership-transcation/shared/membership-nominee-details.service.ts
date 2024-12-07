import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class MembershipNomineeDetailsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateMembershipNomineeDetails(MembershipModel: any) {
    return this.commonHttpService.put(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_NOMINEE_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addMembershipNomineeDetails(MembershipModel: any) {
    return this.commonHttpService.post(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_NOMINEE_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getMembershipNomineeDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_NOMINEE_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllMembershipNomineeDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_NOMINEE_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteMembershipNomineeDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_NOMINEE_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getMembershipNomineeDetailsByMembershipIdAndPacsId(id: string,branchId: string , membershipId: string, pacsId: string) {
    let headers = new HttpHeaders({ 'id': id + '' ,'branchId': branchId+'', 'membershipId': membershipId+'', 'pacsId': pacsId+''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_NOMINEE_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_MEMBER_NOMINEE_DETAILS_BY_MEMBERSHIP_ID_AND_PACS_ID);
  }
}
