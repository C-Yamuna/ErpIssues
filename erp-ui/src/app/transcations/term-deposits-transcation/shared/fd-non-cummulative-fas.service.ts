import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FdNonCummulativeFasService {

  constructor(private commonHttpService : CommonHttpService) { }

  updateFdNonCummulativeFas(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addFdNonCummulativeFas(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_FAS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getAllFdNonCummulativeFas() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_FAS + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getFdNonCummulativeFasById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_FAS + ERP_TRANSACTION_CONSTANTS.GET)
  }
  deleteFdNonCummulativeFas(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_FAS + ERP_TRANSACTION_CONSTANTS.DELETE)
  }
}
