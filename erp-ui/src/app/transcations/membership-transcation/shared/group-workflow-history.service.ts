import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class GroupWorkflowHistoryService {
  constructor(private commonHttpService: CommonHttpService) { }

  updateGroupWorkFlowHistory(MembershipModel: any) {
    return this.commonHttpService.put(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.GROUP_WORKFLOW_HISTORY + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addGroupWorkFlowHistory(MembershipModel: any) {
    return this.commonHttpService.post(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.GROUP_WORKFLOW_HISTORY + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getGroupWorkFlowHistoryById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.GROUP_WORKFLOW_HISTORY + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllGroupWorkFlowHistory(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.GROUP_WORKFLOW_HISTORY + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteGroupWorkFlowHistory(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.GROUP_WORKFLOW_HISTORY + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
