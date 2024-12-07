import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';



@Injectable({
  providedIn: 'root'
})
export class SaoCommunicationService {

  constructor(private commonHttpService:CommonHttpService) { }

  
  updateSaoLoanCommunication(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SAO_LOAN_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSaoLoanCommunication(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SAO_LOAN_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.ADD)
  }

  getCommunicationDetailsByLoanApplicationId(id : any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.GET_COMMUNICATION_DETAILS_BY_LOAN_APPLICATION_ID);
  }

  getstatesList(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.COMMON_MASTER + ERP_TRANSACTION_CONSTANTS.STATES + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  getDistrictsList(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.COMMON_MASTER + ERP_TRANSACTION_CONSTANTS.DISTRICT + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  getMandalsList(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.COMMON_MASTER + ERP_TRANSACTION_CONSTANTS.SUB_DISTRICT + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  getVillageList(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.COMMON_MASTER + ERP_TRANSACTION_CONSTANTS.VILLAGES + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  getDistrictsByStateId(stateId : any){
    let headers = new HttpHeaders({ 'stateId': stateId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.COMMON_MASTER + ERP_TRANSACTION_CONSTANTS.DISTRICT + ERP_TRANSACTION_CONSTANTS.GET_DISTRICT_BY_STATE_ID);
  }
  getMandalsByDistrictId(districtId : any){
    let headers = new HttpHeaders({ 'districtId': districtId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.COMMON_MASTER + ERP_TRANSACTION_CONSTANTS.SUB_DISTRICT + ERP_TRANSACTION_CONSTANTS.GET_SUB_DISTRICTS_BY_ID);
  }
  getvillagesByMandalId(subDistrictId : any){
    let headers = new HttpHeaders({ 'subDistrictId': subDistrictId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.COMMON_MASTER + ERP_TRANSACTION_CONSTANTS.VILLAGES + ERP_TRANSACTION_CONSTANTS.GET_VILLAGES_BY_SUB_DISTRICT_ID);
  }
  getSaoLoanCommunicationByLoanApplicationIdAndMemberTypeAndAdmissionNumber(id : any,memberTypeId: any,admissionNumber:any){
    let headers = new HttpHeaders({ 'id': id + '', 'memberTypeId': memberTypeId + '','admissionNumber': admissionNumber + ''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.GET_BY_LOAN_ID_MEMBER_TYPE_AND_ADMISSION_NUMMBER);
  }
  getCommunicationDetailsByLoanApplicationIdAndMemberType(id : any,communicationTypeId: any){
    let headers = new HttpHeaders({ 'id': id + '', 'communicationTypeId': communicationTypeId + '',})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.GET_BY_LOAN_ID_MEMBER_TYPE);
  }
}
