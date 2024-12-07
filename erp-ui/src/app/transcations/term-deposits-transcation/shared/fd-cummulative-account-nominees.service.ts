import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class FdCummulativeAccountNomineesService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateFdCummulativeAccountNominees(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNT_NOMINEE + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addFdCummulativeAccountNominees(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNT_NOMINEE + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getFdCummulativeAccountNomineesById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNT_NOMINEE + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllFdCummulativeAccountNominees(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNT_NOMINEE + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteFdCummulativeAccountNominees(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNT_NOMINEE + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 getNomineeByFdCummulativeAccountId(id: any) {
    let headers = new HttpHeaders({  'id': id+''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNT_NOMINEE + ERP_TRANSACTION_CONSTANTS.GET_NOMINEE_BY_FD_CUMULATIVE_ACCOUNT_ID);
  }
}
