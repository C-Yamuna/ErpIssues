import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';
import { TermDepostModel } from './term-depost-model.model';
@Injectable({
  providedIn: 'root'
})
export class WorkFlowStepsService {

  constructor(private commonHttpService : CommonHttpService) { }
  updateWorkFlowSteps(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.WORK_FLOW_STEPS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addWorkFlowSteps(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.WORK_FLOW_STEPS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getAllWorkFlowSteps() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.WORK_FLOW_STEPS + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getWorkFlowSteps(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.WORK_FLOW_STEPS + ERP_TRANSACTION_CONSTANTS.GET)
  }
  deleteWorkFlowSteps(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.WORK_FLOW_STEPS + ERP_TRANSACTION_CONSTANTS.DELETE)
  }
}
