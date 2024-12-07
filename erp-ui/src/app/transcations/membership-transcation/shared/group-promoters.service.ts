import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class GroupPromotersService {
  constructor(private commonHttpService: CommonHttpService) { }

  updateGroupPromoters(MembershipModel: any) {
    return this.commonHttpService.put(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.GROUP_PROMOTERS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addGroupPromoters(MembershipModel: any) {
    return this.commonHttpService.post(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.GROUP_PROMOTERS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getGroupPromotersById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.GROUP_PROMOTERS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllGroupPromoters(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.GROUP_PROMOTERS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteGroupPromoters(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.GROUP_PROMOTERS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getGroupPromoterDetailsByGroupId(id: string,branchId: string , pacsId: string) {
    let headers = new HttpHeaders({ 'id': id + '' ,'branchId': branchId+'', 'pacsId': pacsId+''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.GROUP_PROMOTERS + ERP_TRANSACTION_CONSTANTS.GET_GROUP_PROMOTER_DETAILS_BY_GROUP_ID);
  }
}
