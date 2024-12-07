import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SaoKycService {

  constructor(private commonHttpService: CommonHttpService) { }

  getAllDocumentTypes(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  getDocumentById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);  
  }
  updateDocument(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SAO_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addDocument(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SAO_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
 
  getAllKYCDocTypes(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.COMMON_MASTER + ERP_TRANSACTION_CONSTANTS.KYC_DOC_TYPE + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  getAllKycsDetailsByAdmissionNumber(admissionNumber : any){
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_KYC_DETAILS_BY_ADMISSION_NUMBER);
  }
  saveKycList(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.SAVE_KYC_LIST);
  }
  getAllSaoKycsDetailsByApplicationId(id : any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL_KYC_BY_APPLICATION_ID);
  }

}
