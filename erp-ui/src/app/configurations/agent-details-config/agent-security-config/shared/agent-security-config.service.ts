import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class AgentSecurityConfigService {
  
  constructor(private commonHttpService:CommonHttpService) { }

  updateAgentSecurityConfigDetails(agentSecurityConfigModel:any){
    return this.commonHttpService.put(agentSecurityConfigModel, Headers, Configuration.AGENTDETAILS + Configuration.AGENT_SECURITY_CONFIG + Configuration.UPDATE);
  }

  addAgentSecurityConfigDetails(agentSecurityConfigModel:any){
    return this.commonHttpService.post(agentSecurityConfigModel, Headers, Configuration.AGENTDETAILS + Configuration.AGENT_SECURITY_CONFIG+ Configuration.ADD);
  }

  getAllAgentSecurityConfigDetails(){
    return this.commonHttpService.getAll(Configuration.AGENTDETAILS + Configuration.AGENT_SECURITY_CONFIG + Configuration.GET_ALL);
  }

  getAgentSecurityConfigDetailsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.AGENTDETAILS + Configuration.AGENT_SECURITY_CONFIG + Configuration.GET);
  }

  deleteAgentSecurityConfigDetails(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.AGENTDETAILS + Configuration.AGENT_SECURITY_CONFIG + Configuration.DELETE);
  }
}
