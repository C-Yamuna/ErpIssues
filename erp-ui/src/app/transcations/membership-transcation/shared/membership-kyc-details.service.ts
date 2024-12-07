import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class MembershipKycDetailsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateMembershipKycDetails(MembershipModel: any) {
    return this.commonHttpService.put(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addMembershipKycDetails(MembershipModel: any) {
    return this.commonHttpService.post(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getMembershipKycDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllMembershipKycDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteMembershipKycDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getMembershipKycDetailsByMemberIdAndPacsId(memberId: any, pacsId: any,branchId:any) { 
    let headers = new HttpHeaders({'memberId': memberId+'', 'pacsId': pacsId+'','branchId':branchId+''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_MEMBER_KYC_DETAILS_BY_MEMBERSHIP_ID_AND_PACS_ID);
  }
}
