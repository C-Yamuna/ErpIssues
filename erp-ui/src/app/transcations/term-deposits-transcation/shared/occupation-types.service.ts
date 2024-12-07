import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';
import { TermDepostModel } from './term-depost-model.model';

@Injectable({
  providedIn: 'root'
})
export class OccupationTypesService {

  constructor(private commonHttpService : CommonHttpService) { }
  updateOccupationTypes(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.OCCUPATION_TYPES + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addOccupationTypes(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.OCCUPATION_TYPES + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getAllOccupationTypes() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.OCCUPATION_TYPES + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getOccupationTypes(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.OCCUPATION_TYPES + ERP_TRANSACTION_CONSTANTS.GET)
  }
  deleteOccupationTypes(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.OCCUPATION_TYPES + ERP_TRANSACTION_CONSTANTS.DELETE)
  }
}
