import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class SavingsBankCommunicationService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSbCommunication(object:any){
    return this.commonHttpService.put(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.SB_COMMUNICATION_DETAILS + Configuration.UPDATE);
  }

  addSbCommunication(object:any){
    return this.commonHttpService.post(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.SB_COMMUNICATION_DETAILS+ Configuration.ADD);
  }

  getAllSbCommunication(){
    return this.commonHttpService.getAll(Configuration.DEMANDDEPOSITS + Configuration.SB_COMMUNICATION_DETAILS + Configuration.GET_ALL);
  }

  getSbCommunication(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.DEMANDDEPOSITS + Configuration.SB_COMMUNICATION_DETAILS + Configuration.GET);
  }

  deleteSbCommunication(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.DEMANDDEPOSITS + Configuration.SB_COMMUNICATION_DETAILS + Configuration.DELETE);
  }

  getCommunicationBySbAccountId(id : any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.DEMANDDEPOSITS + Configuration.SB_COMMUNICATION_DETAILS + Configuration.SB_COMMUNICATION_BY_ACCOUNT_ID);
    
  }
  getstatesList(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.STATE + Configuration.GET_ALL);
  }
  getDistrictsList(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.DISTRICT + Configuration.GET_ALL);
  }
  getMandalsList(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.SUB_DISTRICT + Configuration.GET_ALL);
  }
  getVillageList(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.VILLAGES + Configuration.GET_ALL);
  }
  getDistrictsByStateId(id : any){
    let headers = new HttpHeaders({ 'stateId': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.DISTRICT + Configuration.GET_DISTRICT_BY_STATE_ID);
  }
  getMandalsByDistrictId(id : any){
    let headers = new HttpHeaders({ 'districtId': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.SUB_DISTRICT + Configuration.GET_SUB_DISTRICTS_BY_DISTRICT_ID);
  }
  getvillagesByMandalId(id : any){
    let headers = new HttpHeaders({ 'subDistrictId': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.VILLAGES + Configuration.GET_VILLAGES_BY_SUB_DISTRICT_ID);
  }
  getCommuniccationDetailsByMemberTypeAndAdmissionNumberAndMemberType(id : any , memberTypeId : any ,admissionNumber:any ){
    let headers = new HttpHeaders({ 'id': id + '', 'memberTypeId': memberTypeId + '','admissionNumber': admissionNumber + ''})
    return this.commonHttpService.getById( headers, Configuration.DEMANDDEPOSITS + Configuration.SB_COMMUNICATION_DETAILS + Configuration.GET_COMMUNICATION_DETAILS_BY_ID_MEMBER_TYPE_ADMISSION_NUMBER);
    
  }
  getCommuniccationDetailsByAdmissionNumberAndMemberType( memberTypeId : any ,admissionNumber:any ){
    let headers = new HttpHeaders({  'memberTypeId': memberTypeId + '','admissionNumber': admissionNumber + ''})
    return this.commonHttpService.getById( headers, Configuration.DEMANDDEPOSITS + Configuration.SB_COMMUNICATION_DETAILS + Configuration.GET_COMMUNICATION_DETAILS_BY_MEMBER_TYPE_ADMISSION_NUMBER);
  }

  getCommuniccationDetailsByAdmissionNumber( admissionNumber:any ){
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + ''})
    return this.commonHttpService.getById( headers, Configuration.DEMANDDEPOSITS + Configuration.SB_COMMUNICATION_DETAILS + Configuration.GET_COMMUNICATE_BY_ADMISSION_NUMBER);
    
  }
}
