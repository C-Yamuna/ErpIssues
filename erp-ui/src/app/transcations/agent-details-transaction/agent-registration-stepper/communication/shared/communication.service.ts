import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';


@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateCommunication(AgentDetailsTransactionModel:any){
    return this.commonHttpService.put(AgentDetailsTransactionModel, Headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addCommunication(AgentDetailsTransactionModel:any){
    return this.commonHttpService.post(AgentDetailsTransactionModel, Headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_COMMUNICATION+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllCommunication(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getCommunicationById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteCommunication(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  getCommunicationDetailsByAgentId(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.GET_COMMUNICATION_DETAILS_BY_AGENT_ID);
  }
}
