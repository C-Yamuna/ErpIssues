import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class InstitutionPromoterDetailsService {

  constructor(private commonHttpService: CommonHttpService) { }
  updateInstitutionPromoterDetails(MembershipModel: any) {
    return this.commonHttpService.put(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.INSTITUTION_PROMOTER_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addInstitutionPromoterDetails(MembershipModel: any) {
    return this.commonHttpService.post(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.INSTITUTION_PROMOTER_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getInstitutionPromoterDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.INSTITUTION_PROMOTER_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllInstitutionPromoterDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.INSTITUTION_PROMOTER_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteInstitutionPromoterDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.INSTITUTION_PROMOTER_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getInstitutionPromoterDetailsByInstitutionIdAndPacsId(id: string,branchId: string , pacsId: string , instituteId: string) {
    let headers = new HttpHeaders({ 'id': id + '' ,'branchId': branchId+'', 'pacsId': pacsId+'' , 'instituteId':instituteId+''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.INSTITUTION_PROMOTER_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_INSTITUTION_PROMOTER_DETAILS_BY_INSTITUTION_ID_AND_PACS_ID);
  }
}

