import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class NomineeGuardianDetailsService {

  constructor(private commonHttpService: CommonHttpService) { }
  
  updateMembershipNomineeGuardianDetails(MembershipModel: any) {
    return this.commonHttpService.put(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.MEMBER_NOMINEE_GUARDIAN_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addMembershipNomineeGuardianDetails(MembershipModel: any) {
    return this.commonHttpService.post(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.MEMBER_NOMINEE_GUARDIAN_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getMembershipNomineeGuardianDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBER_NOMINEE_GUARDIAN_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getMembershipNomineeGuardianDetails(){
    return this.commonHttpService.getById(Headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBER_NOMINEE_GUARDIAN_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteMembershipNomineeGuardianDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBER_NOMINEE_GUARDIAN_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getMembershipNomineeGuardianDetailsByMemberIdAndPacsId(id: string,branchId: string , membershipId: string, pacsId: string) {
    let headers = new HttpHeaders({ 'id': id + '' ,'branchId': branchId+'', 'membershipId': membershipId+'', 'pacsId': pacsId+''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBER_NOMINEE_GUARDIAN_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_MEMBER_NOMINEE_GUARDIAN_DETAILS_BY_MEMBERSHIP_ID_AND_PACS_ID);
  }
}
