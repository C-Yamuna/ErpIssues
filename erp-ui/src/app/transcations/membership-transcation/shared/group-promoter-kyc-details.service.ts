import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class GroupPromoterKycDetailsService {
  constructor(private commonHttpService: CommonHttpService) { }

  updateGroupPromoterKycDetails(MembershipModel: any) {
    return this.commonHttpService.put(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.GROUP_PROMOTER_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addGroupPromoterKycDetails(MembershipModel: any) {
    return this.commonHttpService.post(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.GROUP_PROMOTER_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getGroupPromoterKycDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.GROUP_PROMOTER_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllGroupPromoterKycDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.GROUP_PROMOTER_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteGroupPromoterKycDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.GROUP_PROMOTER_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getGroupKycDetailsByGroupIdAndPacsId(id: string,branchId: string , pacsId: string , pramoterId: string) {
    let headers = new HttpHeaders({ 'id': id + '' ,'branchId': branchId+'', 'pacsId': pacsId+'' , 'pramoterId':pramoterId+''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.GROUP_PROMOTER_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_GROUP_KYC_DETAILS_BY_GROUPID_AND_PACSID);
  }
}
