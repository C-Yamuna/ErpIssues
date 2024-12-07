import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';
import { TermDepostModel } from './term-depost-model.model';

@Injectable({
  providedIn: 'root'
})
export class RdAccountNomineeService {

  constructor(private commonHttpService : CommonHttpService) { }
  updateRdAccountNominees(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_NOMINEES + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addRdAccountNominees(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_NOMINEES + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getAllRdAccountNominees() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_NOMINEES + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getRdAccountNominees(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_NOMINEES + ERP_TRANSACTION_CONSTANTS.GET)
  }
  getNomineeByTermAccountId(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_NOMINEES + ERP_TRANSACTION_CONSTANTS.GET_NOMINEE_BY_TERM_ACCOUNT_ID)
  }
  deleteRdAccountNominees(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_NOMINEES + ERP_TRANSACTION_CONSTANTS.DELETE)
  }

  getNomineeByAccountNumber(accountNumber: any) {
    let headers = new HttpHeaders({ 'accountNumber': accountNumber + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_NOMINEES + ERP_TRANSACTION_CONSTANTS.GET_NOMINEE_DETAILS_BY_ACCOUNT_NUMBER)
  }
}
