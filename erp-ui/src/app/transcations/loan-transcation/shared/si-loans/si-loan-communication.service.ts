import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class SiLoanCommunicationService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateSiLoanCommunication(object: any) {
    return this.commonHttpService.put(object, Headers, Configuration.LOANS + Configuration.SI_LOAN_COMMUNICATION_DETAILS + Configuration.UPDATE);
  }

  addSiLoanCommunication(object: any) {
    return this.commonHttpService.post(object, Headers, Configuration.LOANS + Configuration.SI_LOAN_COMMUNICATION_DETAILS + Configuration.ADD);
  }

  getAllSiLoanCommunication() {
    return this.commonHttpService.getAll(Configuration.LOANS + Configuration.SI_LOAN_COMMUNICATION_DETAILS + Configuration.GET_ALL);
  }

  getSiLoanCommunication(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers, Configuration.LOANS + Configuration.SI_LOAN_COMMUNICATION_DETAILS + Configuration.GET);
  }

  deleteSiLoanCommunication(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete(headers, Configuration.LOANS + Configuration.SI_LOAN_COMMUNICATION_DETAILS + Configuration.DELETE);
  }

  getSILoanCommunicationDetailsByLoanAccId(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers, Configuration.LOANS + Configuration.SI_LOAN_COMMUNICATION_DETAILS + Configuration.SI_LOAN_COMMUNICATION_BY_ACCOUNT_ID);
  }

  getAllStates() {
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.STATE + Configuration.GET_ALL);
  }

  getAllDisttricts() {
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.DISTRICT + Configuration.GET_ALL);
  }

  getAllMandals() {
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.SUB_DISTRICT + Configuration.GET_ALL);
  }

  getAllVillages() {
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.VILLAGES + Configuration.GET_ALL);
  }
  
  getDistrictsByStateId(stateId: any) {
    let headers = new HttpHeaders({ 'stateId': stateId + '', })
    return this.commonHttpService.getById(headers, Configuration.COMMON_MASTER + Configuration.DISTRICT + Configuration.GET_DISTRICT_BY_STATE_ID);
  }

  getMandalsByDistrictId(districtId: any) {
    let headers = new HttpHeaders({ 'districtId': districtId + '', })
    return this.commonHttpService.getById(headers, Configuration.COMMON_MASTER + Configuration.SUB_DISTRICT + Configuration.GET_SUB_DISTRICTS_BY_DISTRICT_ID);
  }

  getvillagesByMandalId(subDistrictId: any) {
    let headers = new HttpHeaders({ 'subDistrictId': subDistrictId + '', })
    return this.commonHttpService.getById(headers, Configuration.COMMON_MASTER + Configuration.VILLAGES + Configuration.GET_VILLAGES_BY_SUB_DISTRICT_ID);
  }

  getCommunicationDetailsByMemberTypeAndAdmissionNumberAndMemberType(id: any, memberTypeId: any, admissionNumber: any) {
    let headers = new HttpHeaders({ 'id': id + '', 'memberTypeId': memberTypeId + '', 'admissionNumber': admissionNumber + '' })
    return this.commonHttpService.getById(headers, Configuration.LOANS + Configuration.SI_LOAN_COMMUNICATION_DETAILS + Configuration.GET_COMMUNICATION_DETAILS_BY_ID_MEMBER_TYPE_ADMISSION_NUMBER);
  }

  getCommunicationDetailsByAdmissionNumberAndMemberType(memberTypeId: any, admissionNumber: any) {
    let headers = new HttpHeaders({ 'memberTypeId': memberTypeId + '', 'admissionNumber': admissionNumber + '' })
    return this.commonHttpService.getById(headers, Configuration.LOANS + Configuration.SI_LOAN_COMMUNICATION_DETAILS + Configuration.GET_COMMUNICATION_DETAILS_BY_MEMBER_TYPE_ADMISSION_NUMBER);
  }

  getCommunicationDetailsByAdmissionNumber(admissionNumber: any) {
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '' })
    return this.commonHttpService.getById(headers, Configuration.LOANS + Configuration.SI_LOAN_COMMUNICATION_DETAILS + Configuration.GET_COMMUNICATE_BY_ADMISSION_NUMBER);
  }

}
