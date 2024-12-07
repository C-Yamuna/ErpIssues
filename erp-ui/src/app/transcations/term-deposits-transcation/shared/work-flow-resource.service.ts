import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';
import { TermDepostModel } from './term-depost-model.model';

@Injectable({
  providedIn: 'root'
})
export class WorkFlowResourceService {

  constructor(private commonHttpService : CommonHttpService) { }

  updateWorkFlow(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.WORK_FLOW_RESOURCE + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addWorkFlow(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.WORK_FLOW_RESOURCE + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getAllWorkFlow() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.WORK_FLOW_RESOURCE + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getWorkFlow(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.WORK_FLOW_RESOURCE + ERP_TRANSACTION_CONSTANTS.GET)
  }
  deleteWorkFlow(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.WORK_FLOW_RESOURCE + ERP_TRANSACTION_CONSTANTS.DELETE)
  }
}
