import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class InstitutionCommunicationService {

  constructor(private commonHttpService: CommonHttpService) { }
  updateInstitutionCommunication(MembershipModel: any) {
    return this.commonHttpService.put(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.INSTITUTION_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addInstitutionCommunication(MembershipModel: any) {
    return this.commonHttpService.post(MembershipModel,Headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP+ ERP_TRANSACTION_CONSTANTS.INSTITUTION_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getInstitutionCommunicationById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.INSTITUTION_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllInstitutionCommunication(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.INSTITUTION_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteInstitutionCommunication(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.INSTITUTION_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getInstitutionCommunicationDetailsByInstitutionId(id: string,branchId: string , pacsId: string ) {
    let headers = new HttpHeaders({ 'id': id + '' ,'branchId': branchId+'', 'pacsId': pacsId+''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.INSTITUTION_COMMUNICATION + ERP_TRANSACTION_CONSTANTS.GET_INSTITUTION_COMMUNICATION_DETAILS_BY_INSTITUTION_ID);
  }
}
