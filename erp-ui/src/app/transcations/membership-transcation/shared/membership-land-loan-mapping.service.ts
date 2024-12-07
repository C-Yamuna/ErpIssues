import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class MembershipLandLoanMappingService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateMembershipLandLoanMapping(MembershipModel: any) {
    return this.commonHttpService.put(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.MEMBER_LAND_LOAN_MAPPING + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addMembershipLandLoanMapping(MembershipModel: any) {
    return this.commonHttpService.post(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.MEMBER_LAND_LOAN_MAPPING + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getMembershipLandLoanMappingById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBER_LAND_LOAN_MAPPING + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllMembershipLandLoanMapping(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBER_LAND_LOAN_MAPPING + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteMembershipLoanLandMapping(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBER_LAND_LOAN_MAPPING + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 
}
