import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class InstitutionKycDetailsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateInstitutionKycDetails(MembershipModel: any) {
    return this.commonHttpService.put(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.INSTITUTION_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addInstitutionKycDetails(MembershipModel: any) {
    return this.commonHttpService.post(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.INSTITUTION_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getInstitutionKycDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.INSTITUTION_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllInstitutionKycDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.INSTITUTION_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteInstitutionKycDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.INSTITUTION_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getInstitutionKycDetailsByInstituteIdAndPacsId(instituteId: any, pacsId: any) {
    let headers = new HttpHeaders({'instituteId': instituteId+'', 'pacsId': pacsId+''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.INSTITUTION_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_INSTITUTION_KYC_DETAILS_BY_INSTITUTE_ID_AND_PACSID);
  }
}
