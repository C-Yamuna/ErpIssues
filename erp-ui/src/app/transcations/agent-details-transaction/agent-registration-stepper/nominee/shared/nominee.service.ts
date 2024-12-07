import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';



@Injectable({
  providedIn: 'root'
})
export class NomineeService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateNomineeDetails(AgentDetailsTransactionModel:any){
    return this.commonHttpService.put(AgentDetailsTransactionModel, Headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_NOMINEE + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addNomineeDetails(AgentDetailsTransactionModel:any){
    return this.commonHttpService.post(AgentDetailsTransactionModel, Headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_NOMINEE+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllNomineeDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_NOMINEE + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getNomineeDetailsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_NOMINEE + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteNomineeDetails(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_NOMINEE + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  getNomineeDetailsByAgentId(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_NOMINEE + ERP_TRANSACTION_CONSTANTS.AGENT_NOMINEE_DETAILS_BY_AGENT_ID);
  }

  getMemberNomineeDetailsByAdmissionNumber(admissionNumber: any){
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_NOMINEE_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_NOMINEE_BY_ADMISSION_NUMBER);
  }

}
