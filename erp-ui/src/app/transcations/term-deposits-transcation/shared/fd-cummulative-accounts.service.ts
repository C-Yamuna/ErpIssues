import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';
import { TermDepostModel } from './term-depost-model.model';

@Injectable({
  providedIn: 'root'
})
export class FdCummulativeAccountsService {

  constructor(private commonHttpService : CommonHttpService) { }
  updateFdCummulativeAccounts(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  sbInterestCalcualtion(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.SB_INTEREST_CALCULATION)
  }
  saveAccountOnRenwal(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.SAVE_ACCOUNT_ON_RENEWAL)
  }
  getSpecialSchemeMaturityAmountOnClosure(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_SPEACIAL_SCHEME_MATURITY_AMOUNT_ON_CLOSURE)
  }
  getMaturityAmountOnForeclosure(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_MATURITY_AMOUNT_ON_FORECLOSURE)
  }
  getMaturityAmountOnClosure(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_MATURITY_AMOUNT_ON_CLOSURE)
  }
  getFdCummulativeInterestPolicyConfig(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_FD_CUMMULATIVE_INTEREST_POLICY_CONFIG)
  }
  fdCummulativeAccountClosureOrForeclosure(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNT_CLOSURE_OR_FORECLOSURE)
  }
  addFdCummulativeAccounts(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getAllFdCummulativeAccounts() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getFdCummulativeAccounts(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET)
  }
  getTransactionsByAccountIdAndTransactionsType(id: string,transactionType: string) {
    let headers = new HttpHeaders({ 'id': id + '','transactionType': transactionType + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_TRANSACTIONS_BY_ACCOUNT_ID_AND_TRANSACTION_TYPE)
  }
  getFdCummulativeAccountsByPacsIdBranchId(pacsId: any,branchId: any) {
    let headers = new HttpHeaders({ 'pacsId': pacsId + '','branchId': branchId + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_FD_CUMMULATIVE_ACCOUNTS_BY_PACSID_BRANCHID)
  }
  getAccountDetailsByAdmissionNumberAndId(admissionNumber: string,id: string) {
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '','id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_ACCOUNT_DETAILS_BY_ADMISSION_NUMBER_AND_ID)
  }
  getAllTransactionsByFdAccountId(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_ALL_TRANSACTIONS_BY_FD_ACCOUNT_ID)
  }
  deleteFdCummulativeAccounts(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.DELETE)
  }
}
