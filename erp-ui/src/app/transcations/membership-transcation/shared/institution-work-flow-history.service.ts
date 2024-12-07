import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class InstitutionWorkFlowHistoryService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateInstitutionWorkFlowHistory(MembershipModel: any) {
    return this.commonHttpService.put(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.INSTITUTION_WORKFLOW_HISTORY + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addInstitutionWorkFlowHistory(MembershipModel: any) {
    return this.commonHttpService.post(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.INSTITUTION_WORKFLOW_HISTORY + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getInstitutionWorkFlowHistoryById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.INSTITUTION_WORKFLOW_HISTORY + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllInstitutionWorkFlowHistory(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.INSTITUTION_WORKFLOW_HISTORY + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteInstitutionWorkFlowHistory(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.INSTITUTION_WORKFLOW_HISTORY + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
