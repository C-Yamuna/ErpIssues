import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { BehaviorSubject } from 'rxjs';

export type stepperDataModel = {
  formValid?: boolean,
  stepperIndex?: number;
  data?: any;
  method?:any;
  url?: string;
  isObjChanged?:boolean;
  isDisable?:boolean;

} | null;

@Injectable({
  providedIn: 'root'
})
export class AgentDetailsTransactionService {
  private organizationDetailsStepper = new BehaviorSubject<stepperDataModel>(null);
  public currentStep = this.organizationDetailsStepper.asObservable();

  constructor(private commonHttpService:CommonHttpService) { }

  changeData(data: stepperDataModel) {
    this.organizationDetailsStepper.next(data)
  }

  updateAgentDetails(AgentDetailsTransactionModel:any){
    return this.commonHttpService.put(AgentDetailsTransactionModel, Headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addAgentDetails(AgentDetailsTransactionModel:any){
    return this.commonHttpService.post(AgentDetailsTransactionModel, Headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_DETAILS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllAgentDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getAgentDetailsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteAgentDetails(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  getPreviewDetailsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_PREVIEW_DETAILS);
  }

}
