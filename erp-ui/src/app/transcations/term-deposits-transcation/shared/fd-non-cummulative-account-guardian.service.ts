import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FdNonCummulativeAccountGuardianService {

  constructor(private commonHttpService : CommonHttpService) { }

  updateFdNonCummulativeAccountGuardian(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNT_GUARDIAN+ ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addFdNonCummulativeAccountGuardian(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNT_GUARDIAN + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getGuardianDetailsByTermAccountId(id: any) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNT_GUARDIAN + ERP_TRANSACTION_CONSTANTS.GET_GUARDIAN_DETAILS_BY_TERM_ACCOUNT_ID)
  }

  getAllFdNonCummulativeAccountGuardian() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNT_GUARDIAN + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getFdNonCummulativeAccountGuardianById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNT_GUARDIAN + ERP_TRANSACTION_CONSTANTS.GET)
  }
  deleteFdNonCummulativeAccountGuardian(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNT_GUARDIAN + ERP_TRANSACTION_CONSTANTS.DELETE)
  }
}
