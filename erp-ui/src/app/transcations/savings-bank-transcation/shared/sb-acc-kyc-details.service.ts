import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SbAccKycDetailsService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSbAccKycDetails(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_ACC_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSbAccKycDetails(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_ACC_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getKycDetailsBySbAccId(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_ACC_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_KYC_DETAILS_BY_SB_ACC_ID);
  }

  getAllSbAccKycDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_ACC_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getKycByAccIdAndMemberTypeAndMemberId(id: any,memberType: any,memberId:any){
    let headers = new HttpHeaders({ 'id': id + '', 'memberType': memberType + '', 'memberId': memberId + ''})
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_ACC_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_KYC_BY_ACC_ID_AND_MEMBER_TYPE_AND_MEMBER_ID);
  }

  getKycAccIdAndMemberTypeAndAdmissionNumber(id: any,memberTypeId: any,admissionNumber:any){
    let headers = new HttpHeaders({ 'id': id + '', 'memberTypeId': memberTypeId + '', 'admissionNumber': admissionNumber + ''})
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_ACC_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_KYC_BY_ACC_ID_AND_MEMBER_TYPE_AND_ADMISSION_NUMBER);
  }

  getSbAccKycDetailsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_ACC_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSbAccKycDetails(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_ACC_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
