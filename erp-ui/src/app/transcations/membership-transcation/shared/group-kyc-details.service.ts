import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class GroupKycDetailsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateGroupKycDetails(MembershipModel: any) {
    return this.commonHttpService.put(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.GROUP_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addGroupKycDetails(MembershipModel: any) {
    return this.commonHttpService.post(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.GROUP_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getGroupKycDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.GROUP_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllGroupKycDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.GROUP_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteGroupKycDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.GROUP_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getGroupKycDetailsByGroupIdAndPacsId(id: any, pacsId: any,branchId:any ) {
    let headers = new HttpHeaders({ 'id': id + '' , 'pacsId': pacsId+'', 'branchId': branchId+''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.GROUP_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_GROUP_KYC_DETAILS_BY_GROUP_ID_AND_PACS_ID);
  }
}
