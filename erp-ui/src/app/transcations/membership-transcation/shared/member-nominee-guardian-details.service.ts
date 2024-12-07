import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class MemberNomineeGuardianDetailsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateMemberNomineeGuardianDetails(MembershipModel: any) {
    return this.commonHttpService.put(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.MEMBER_NOMINEE_GUARDIAN_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addMemberNomineeGuardianDetails(MembershipModel: any) {
    return this.commonHttpService.post(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.MEMBER_NOMINEE_GUARDIAN_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getMemberNomineeGuardianDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBER_NOMINEE_GUARDIAN_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllMemberNomineeGuardianDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBER_NOMINEE_GUARDIAN_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteMemberNomineeGuardianDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBER_NOMINEE_GUARDIAN_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getMemberNomineeGuardianDetailsByMembershipIdAndPacsId(id: any, pacsId:any,branchId: any) {
    let headers = new HttpHeaders({ 'id': id + '' ,'pacsId': pacsId+'', 'branchId': branchId+''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBER_NOMINEE_GUARDIAN_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_MEMBER_NOMINEE_GUARDIAN_DETAILS_BY_MEMBERSHIP_ID_AND_PACS_ID);
  }
}
