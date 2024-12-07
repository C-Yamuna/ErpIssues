import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class FdCummulativeAccountGaurdianService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateFdCummulativeAccountGaurdian(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_ACCOUNT_GAURDIAN + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addFdCummulativeAccountGaurdian(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_ACCOUNT_GAURDIAN + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getFdCummulativeAccountGaurdianById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_ACCOUNT_GAURDIAN + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllFdCummulativeAccountGaurdian(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_ACCOUNT_GAURDIAN + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteFdCummulativeAccountGaurdian(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_ACCOUNT_GAURDIAN + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 getFdGaurdianDetailsByFdCummulativeAccountId(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_ACCOUNT_GAURDIAN + ERP_TRANSACTION_CONSTANTS.GET_GAURDIAN_DETAILS_BY_FD_CUMULATIVE_ACCOUNT_ID);
  }
 
}
