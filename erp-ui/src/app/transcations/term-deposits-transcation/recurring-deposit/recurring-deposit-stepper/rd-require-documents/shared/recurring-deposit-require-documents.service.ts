import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class RecurringDepositRequireDocumentsService {

  constructor(private commonHttpService:CommonHttpService) { }


  updateRequireDocument(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_REQUIRED_DOCUMENT_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addRequireDocument(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_REQUIRED_DOCUMENT_DETAILS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getRequireDocumentByAccountIdAndMemberTypeAndMemberId(id: any , memberTypeId: any,membershipId :any) {
    let headers = new HttpHeaders({ 'id': id + '' ,'memberTypeId': memberTypeId+'','membershipId': membershipId+''})
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_REQUIRED_DOCUMENT_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_REQUIRED_DOCUMENT_DETAILS_BY_ACC_ID_AND_MEMBER_TYPE_AND_MEMBER_ID)
  }

  getRdAccountIdAndMemberTypeAndAdmissionNumber(id: any , memberTypeId: any,admissionNumber :any) {
    let headers = new HttpHeaders({ 'id': id + '' ,'memberTypeId': memberTypeId+'','admissionNumber': admissionNumber+''})
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.GET_REQUIRED_DOCUMENT_DETAILS_BY_ACC_ID_AND_MEMBER_TYPE_AND_ADMISSION_NUMBER)
  }

  getRequireDocumentByAccId(id: any) {
    let headers = new HttpHeaders({ 'id': id + ''})
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.GET_REQUIRED_DOCUMENT_DETAILS_BY_ACC_ID)
  }
  
  getRequireDocumentByAdmissionNumber(admissionNumber: any) {
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + ''})
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.GET_REQUIRED_DOCUMENTS_BY_ADMISSION_NUMBER)
  }

  getAllRequireDocument() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_REQUIRED_DOCUMENT_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }

  getRequireDocumentById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_REQUIRED_DOCUMENT_DETAILS + ERP_TRANSACTION_CONSTANTS.GET)
  }

  deleteRequireDocument(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_REQUIRED_DOCUMENT_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE)
  }
}
