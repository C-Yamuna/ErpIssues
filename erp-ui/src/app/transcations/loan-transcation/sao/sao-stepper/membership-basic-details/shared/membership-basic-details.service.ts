import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class MembershipBasicDetailsService {

  
  constructor(private commonHttpService:CommonHttpService) { }

  
  updateIndividualMemberDetails(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.INDIVIDUAL_MEMBER_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addIndividualMemberDetails(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.INDIVIDUAL_MEMBER_DETAILS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getIndividualMemberDetailsById(id:any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers , ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.INDIVIDUAL_MEMBER_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  getMemberShipGroupDetailsById(id:any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers , ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_GROUP_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  getMemberInstutionDetailsById(id:any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers , ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.MEM_INSTITUTIONS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  getIndividualMemberDetailsByAdmissionNumber(admissionNumber: any){
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '', })
    return this.commonHttpService.getById(headers , ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.INDIVIDUAL_MEMBER_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_MEMBER_DETAILS_BY_ADMISSION_NUMBER);
  }
  
  getGroupMemberDetailsByAdmissionNumber(admissionNumber: any){
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '', })
    return this.commonHttpService.getById(headers , ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_GROUP_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_MEMBER_DETAILS_BY_ADMISSION_NUMBER);
  }

  getMemberInstitutionDetailsByAdmissionNumber(admissionNumber: any){
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '', })
    return this.commonHttpService.getById(headers , ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.MEM_INSTITUTIONS + ERP_TRANSACTION_CONSTANTS.GET_MEMBER_DETAILS_BY_ADMISSION_NUMBER);
  }

  getAllOccupationTypesList(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.COMMON_MASTER + ERP_TRANSACTION_CONSTANTS.OCCUPATION_TYPES + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getAllQualificationTypes(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.COMMON_MASTER + ERP_TRANSACTION_CONSTANTS.QUALIFICATION + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getAllCastes(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.COMMON_MASTER + ERP_TRANSACTION_CONSTANTS.CASTE + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getAllOperationTypes(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.COMMON_MASTER + ERP_TRANSACTION_CONSTANTS.OPERATOR_TYPES + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  updateGropDetails(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_GROUP_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addGropuDetails(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_GROUP_DETAILS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  updateInstitutionDetails(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.MEM_INSTITUTIONS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addInstitutionDetails(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.MEM_INSTITUTIONS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }
  getAllTypeOfMemberDetailsListFromMemberModule(pacsId:any,branchId:any){
    let headers = new HttpHeaders({ 'pacsId': pacsId + '' , 'branchId': branchId+''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_BASIC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL_GRID);
  }

  getMembershipBasicDetailsByAdmissionNumber(admissionNumber: any) {
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_BASIC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_MEMBERSHIP_DETAILS_BY_ADMISSION_NUMBER);
  }

  getAllMemberTypes(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.COMMON_MASTER + ERP_TRANSACTION_CONSTANTS.MEMBER_TYPES + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  getMemberShipGroupDetailsByAdmissionNumber(admissionNumber : any){
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_GROUP_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_MEMBERSHIP_GROUP_DETAILS_BY_ADMISSION_NUMBER);
  }
  getMemberIstitutionByAdmissionNumber(admissionNumber: any) {
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEM_INSTITUTIONS + ERP_TRANSACTION_CONSTANTS.GET_INSTITUTION_BY_ADMISSION_NUMBER);
  }
  getMemberDetailsByLoanId(id: any) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_APPLICATION + ERP_TRANSACTION_CONSTANTS.GET_MEMBER_DETAILS_BY_APPLICATION_ID);
  }
}
