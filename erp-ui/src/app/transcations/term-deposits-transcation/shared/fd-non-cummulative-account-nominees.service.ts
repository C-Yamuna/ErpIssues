import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FdNonCummulativeAccountNomineesService {

  constructor(private commonHttpService : CommonHttpService) { }

  updateFdNonCummulativeAccountNominees(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNT_NOMINEES+ ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addFdNonCummulativeAccountNominees(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNT_NOMINEES + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getNomineeByTermAccountId(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNT_NOMINEES + ERP_TRANSACTION_CONSTANTS.GET_NOMINEE_BY_TERM_ACCOUNT_ID)
  }
  getAllFdNonCummulativeAccountNominees() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNT_NOMINEES + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getFdNonCummulativeAccountNomineesById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNT_NOMINEES + ERP_TRANSACTION_CONSTANTS.GET)
  }
  deleteFdNonCummulativeAccountNominees(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNT_NOMINEES + ERP_TRANSACTION_CONSTANTS.DELETE)
  }
}
