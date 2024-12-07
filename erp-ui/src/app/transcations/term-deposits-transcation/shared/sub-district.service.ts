import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';
import { TermDepostModel } from './term-depost-model.model';

@Injectable({
  providedIn: 'root'
})
export class SubDistrictService {

  constructor(private commonHttpService : CommonHttpService) { }
  updateSubDistrict(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.SUB_DISTRICT + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSubDistrict(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.SUB_DISTRICT + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getAllSubDistrict() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.SUB_DISTRICT + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getSubDistrict(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.SUB_DISTRICT + ERP_TRANSACTION_CONSTANTS.GET)
  }
  deleteSubDistrict(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.SUB_DISTRICT + ERP_TRANSACTION_CONSTANTS.DELETE)
  }
  getSubDistrictById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.SUB_DISTRICT + ERP_TRANSACTION_CONSTANTS.GET_SUB_DISTRICTS_BY_ID)
  }
}
