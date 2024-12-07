import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class FdCummulativeFasService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateFdCummulativeFas(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_FAS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addFdCummulativeFas(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_FAS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getFdCummulativeFasById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_FAS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllFdCummulativeFas(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_FAS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteFdCummulativeFas(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_FAS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
