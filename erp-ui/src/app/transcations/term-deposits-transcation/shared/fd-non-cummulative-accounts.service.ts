import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FdNonCummulativeAccountsService {

  constructor(private commonHttpService : CommonHttpService) { }

  updateFdNonCummulativeAccounts(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addFdNonCummulativeAccounts(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getAllFdNonCummulativeAccounts() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getFdNonCummulativeAccounts(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET)
  }
  deleteFdNonCummulativeAccounts(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.DELETE)
  }

  updateClouserStatus(TermDepostModel: any){
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.UPDATE_CLOUSER_STATUS)
  }

  getFdNonCummulativeAccountsByAccountIdAndTransactionType(id: any, transactionType:any) {
    let headers = new HttpHeaders({ 'id': id + '' , 'transactionType': transactionType + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_FD_NON_CUMMULATIVE_TRANSACTIONS_BY_ACCOUNT_ID_AND_TRANSACTION_TYPE)
  }

  getFdNonCummulativeAccountDetailsById(id: any) {
    let headers = new HttpHeaders({ 'id': id + ''})
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_FD_NON_CUMMULATIVE_ACCOUNT_DETAILS)
  }

  getFdNonCummulativeByBranchIdPacsId(id: any,pacsId:any) {
    let headers = new HttpHeaders({ 'id': id + '','pacsId':pacsId +''})
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_ALL_FD_NON_CUMMULATIVE_BY_BRANCH_ID_PACS_ID)
  }

  getAccountDetailsByAdmissionNumberAndId(id: any,admissionNumber:any) {
    let headers = new HttpHeaders({ 'id': id + '','admissionNumber':admissionNumber +''})
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_ACCOUNT_DETAILS_BY_ADMISSION_NUMBER_AND_ID)
  }

  sbInterestCalculation(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.SB_INTEREST_CALCULATION)
  }

  saveForeClosureDetails(TermDepostModel: any,isApproved:any) {
    let headers = new HttpHeaders({'isApproved':isApproved +''})
    return this.commonHttpService.post(TermDepostModel,headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.SAVE_FORE_CLOSURE_DETAILS)
  }

  saveFdNonCummulativeInstallmentsOnAccountApproval(TermDepostModel: any,isApproved:any) {
    let headers = new HttpHeaders({'isApproved':isApproved +''})
    return this.commonHttpService.post(TermDepostModel,headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.SAVE_FD_NON_CUMMULATIVE_INSTALLMENTS_ON_ACCOUNT_APPROVAL)
  }

  saveAccountOnRenewal(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.SAVE_ACCOUNT_ON_RENEWAL)
  }

  getFdNonCummulativeInterestPolicyConfig(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_NON_CUMMULATIVE_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_FD_NON_CUMMULATIVE_INTEREST_POLICY_CONFIG)
  }

}
