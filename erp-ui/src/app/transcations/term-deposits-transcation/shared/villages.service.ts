import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';
import { TermDepostModel } from './term-depost-model.model';

@Injectable({
  providedIn: 'root'
})
export class VillagesService {

  constructor(private commonHttpService : CommonHttpService) { }

  updateVillages(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.VILLAGES + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addVillages(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.VILLAGES + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getVillagesBySubDistrictId(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.VILLAGES + ERP_TRANSACTION_CONSTANTS.GET_VILLAGES_BY_SUB_DISTRICT_ID)
  }
  getAllVillages() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.VILLAGES + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getVillage(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.VILLAGES + ERP_TRANSACTION_CONSTANTS.GET)
  }
  deleteVillage(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.VILLAGES + ERP_TRANSACTION_CONSTANTS.DELETE)
  }
}
