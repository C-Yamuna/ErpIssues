import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class AgentMappingService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateAgentMappingDetails(AgentDetailsTransactionModel:any){
    return this.commonHttpService.put(AgentDetailsTransactionModel, Headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_ACCOUNT_MAPPING + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addAgentMappingDetails(AgentDetailsTransactionModel:any){
    return this.commonHttpService.post(AgentDetailsTransactionModel, Headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_ACCOUNT_MAPPING+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  saveAgentAccountMappingDetailsList(AgentDetailsTransactionModel:any){
    return this.commonHttpService.post(AgentDetailsTransactionModel, Headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_ACCOUNT_MAPPING+ ERP_TRANSACTION_CONSTANTS.SAVE_AGENT_ACCOUNT_MAPPING_DETAILS_LIST);
  }

  getAllAgentMappingDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_ACCOUNT_MAPPING + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getAgentMappingDetailsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_ACCOUNT_MAPPING + ERP_TRANSACTION_CONSTANTS.GET);
  }

  getAgentAccountMappingDetailsByAgentId(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_ACCOUNT_MAPPING + ERP_TRANSACTION_CONSTANTS.GET_AGENT_ACCOUNT_MAPPING_DETAILS_BY_AGENT_ID);
  }

  deleteAgentMappingDetails(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_ACCOUNT_MAPPING + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
