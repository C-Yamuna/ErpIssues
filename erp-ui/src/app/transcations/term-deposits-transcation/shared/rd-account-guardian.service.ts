import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';
import { TermDepostModel } from './term-depost-model.model';

@Injectable({
  providedIn: 'root'
})
export class RdAccountGuardianService {

  constructor(private commonHttpService : CommonHttpService) { }
  updateGuardianDetails(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_GUARDIAN + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addGuardianDetails(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_GUARDIAN + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getAllGuardianDetails() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_GUARDIAN + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getGuardianDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_GUARDIAN + ERP_TRANSACTION_CONSTANTS.GET)
  }
  getGuardianDetailsByTermAccountId(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_GUARDIAN + ERP_TRANSACTION_CONSTANTS.GET_GUARDIAN_DETAILS_BY_TERM_ACCOUNT_ID)
  }
  deleteGuardianDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_GUARDIAN + ERP_TRANSACTION_CONSTANTS.DELETE)
  }

  getGuardianDetailsByAccountNumber(accountNumber: string) {
    let headers = new HttpHeaders({ 'accountNumber': accountNumber + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_GUARDIAN + ERP_TRANSACTION_CONSTANTS.GET_GAURDIAN_DETAILS_BY_ACCOUNT_NUMBER)
  }
}
