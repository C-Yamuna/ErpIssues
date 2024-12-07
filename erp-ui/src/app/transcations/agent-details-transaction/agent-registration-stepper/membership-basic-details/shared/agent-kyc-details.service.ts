import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class AgentKycDetailsService {

  constructor(private commonHttpService:CommonHttpService) { }


  updateKycDetails(AgentDetailsTransactionModel:any){
    return this.commonHttpService.put(AgentDetailsTransactionModel, Headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addKycDetails(AgentDetailsTransactionModel:any){
    return this.commonHttpService.post(AgentDetailsTransactionModel, Headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_KYC_DETAILS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }
  getAllKycDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getKycDetailsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  getKycDetailsByAgentId(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_KYC_DETAILS_BY_AGENT_ID);
  }

  getAgentKycDetailsByAdmissionNumber(admisionNumber: any){
    let headers = new HttpHeaders({ 'admissionNumber': admisionNumber + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_KYC_DETAILS_BY_ADMISSION_NUMBERS);
  }

  deleteKycDetails(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.AGENT_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  getAllKYCDocTypes(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.COMMON_MASTER + ERP_TRANSACTION_CONSTANTS.KYC_DOC_TYPE + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
}
