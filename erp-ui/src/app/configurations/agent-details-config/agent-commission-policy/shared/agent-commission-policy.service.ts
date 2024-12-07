import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class AgentCommissionPolicyService {
  
  constructor(private commonHttpService:CommonHttpService) { }

  updateAgentCommissionPolicy(agentCommissionPolicyModel:any){
    return this.commonHttpService.put(agentCommissionPolicyModel, Headers, Configuration.AGENTDETAILS + Configuration.AGENT_COMMISSION_POLICY + Configuration.UPDATE);
  }

  addAgentCommissionPolicy(agentCommissionPolicyModel:any){
    return this.commonHttpService.post(agentCommissionPolicyModel, Headers, Configuration.AGENTDETAILS + Configuration.AGENT_COMMISSION_POLICY+ Configuration.ADD);
  }

  getAllAgentCommissionPolicy(){
    return this.commonHttpService.getAll(Configuration.AGENTDETAILS + Configuration.AGENT_COMMISSION_POLICY + Configuration.GET_ALL);
  }

  getAgentCommissionPolicyById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.AGENTDETAILS + Configuration.AGENT_COMMISSION_POLICY + Configuration.GET);
  }

  deleteAgentCommissionPolicy(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.AGENTDETAILS + Configuration.AGENT_COMMISSION_POLICY + Configuration.DELETE);
  }
}
