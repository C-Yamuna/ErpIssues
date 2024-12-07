import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class InstitutionPromoterKycDetailsService {
  constructor(private commonHttpService: CommonHttpService) { }

  updateInstitutionPromoterKycDetails(MembershipModel: any) {
    return this.commonHttpService.put(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.INSTITUTION_PROMOTER_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addInstitutionPromoterKycDetails(MembershipModel: any) {
    return this.commonHttpService.post(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.INSTITUTION_PROMOTER_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getInstitutionPromoterKycDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.INSTITUTION_PROMOTER_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllInstitutionPromoterKycDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.INSTITUTION_PROMOTER_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteInstitutionPromoterKycDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.INSTITUTION_PROMOTER_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getPromoterKycDetailsByInstitutionIdAndPromoterIdAndPacsId(id: string,branchId: string , pacsId: string , instPromoterId: string) {
    let headers = new HttpHeaders({ 'id': id + '' ,'branchId': branchId+'', 'pacsId': pacsId+'' , 'instPromoterId':instPromoterId+''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.INSTITUTION_PROMOTER_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_PROMOTER_KYC_DETAILS_BY_INSTITUTE_ID_PROMOTER_ID_AND_PACS_ID);
  }
}
