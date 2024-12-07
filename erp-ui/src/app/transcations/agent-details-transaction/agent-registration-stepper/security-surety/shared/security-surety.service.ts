import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SecuritySuretyService {
  constructor(private commonHttpService:CommonHttpService) { }

  updateSecurityDetails(AgentDetailsTransactionModel:any){
    return this.commonHttpService.put(AgentDetailsTransactionModel, Headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_SECURITY + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSecurityDetails(AgentDetailsTransactionModel:any){
    return this.commonHttpService.post(AgentDetailsTransactionModel, Headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_SECURITY+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllSecurityDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_SECURITY + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSecurityDetailsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_SECURITY + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSecurityDetails(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_SECURITY + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  getSecurityDetailsByAgentId(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_SECURITY + ERP_TRANSACTION_CONSTANTS.GET_AGENT_SECURITY_DETAILS_BY_AGENT_ID);
  }

  getAgentSecurityConfigBySecurityConfigId(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_SECURITY + ERP_TRANSACTION_CONSTANTS.GET_AGENT_SECURITY_CONFIG_BY_SECURITY_CONFIG_ID);
  }

  updateSurityDetails(AgentDetailsTransactionModel:any){
    return this.commonHttpService.put(AgentDetailsTransactionModel, Headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_SURITY_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSurityDetails(AgentDetailsTransactionModel:any){
    return this.commonHttpService.post(AgentDetailsTransactionModel, Headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_SURITY_DETAILS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllSurityDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_SURITY_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSurityDetailsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_SURITY_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSurityDetails(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_SURITY_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  getSurityDetailsByAgentId(agent: any){
    let headers = new HttpHeaders({ 'agent': agent + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_SURITY_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_SURITY_DETAILS_BY_AGENT_ID);
  }

  saveAgentSurityDetailsList(agent: any){
    let headers = new HttpHeaders({ 'agent': agent + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_SURITY_DETAILS + ERP_TRANSACTION_CONSTANTS.SAVE_AGENT_SURITY_DETAILS_LIST);
  }
}
