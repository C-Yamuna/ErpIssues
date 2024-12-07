import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';
import { TermDepostModel } from './term-depost-model.model';

@Injectable({
  providedIn: 'root'
})
export class MemberTypesService {

  constructor(private commonHttpService : CommonHttpService) { }
  updateMemberTypes(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.MEMBER_TYPES + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addMemberTypes(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.MEMBER_TYPES + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getAllMemberTypes() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.MEMBER_TYPES + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getMemberTypes(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.MEMBER_TYPES + ERP_TRANSACTION_CONSTANTS.GET)
  }
  deleteMemberTypes(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.MEMBER_TYPES + ERP_TRANSACTION_CONSTANTS.DELETE)
  }
}
