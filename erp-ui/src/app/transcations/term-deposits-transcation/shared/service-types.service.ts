import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';
import { TermDepostModel } from './term-depost-model.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceTypesService {

  constructor(private commonHttpService : CommonHttpService) { }
  updateServiceTypes(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.SERVICE_TYPES + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addServiceTypes(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.SERVICE_TYPES + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getAllServiceTypes() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.SERVICE_TYPES + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getServiceTypes(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.SERVICE_TYPES + ERP_TRANSACTION_CONSTANTS.GET)
  }
  deleteServiceTypes(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.SERVICE_TYPES + ERP_TRANSACTION_CONSTANTS.DELETE)
  }
}
