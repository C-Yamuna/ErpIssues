import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SharesInvestmentsService {
  constructor(private commonHttpService: CommonHttpService) { }

  updateSharesInvestments(investmentAccountDocumentsModel: any) {
    return this.commonHttpService.put(investmentAccountDocumentsModel, Headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.SHARES_INVESTMENT_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSharesInvestments(investmentAccountDocumentsModel: any) {
    return this.commonHttpService.post(investmentAccountDocumentsModel, Headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.SHARES_INVESTMENT_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.ADD);
  }

  sharesInvestmentAccountStatusApproval(investmentAccountDocumentsModel: any) {
    return this.commonHttpService.post(investmentAccountDocumentsModel, Headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.SHARES_INVESTMENT_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.SHARES_INVESTMENT_ACCOUNT_STATUS_APPROVAL);
  }
  getAllSharesInvestments() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.SHARES_INVESTMENT_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSharesInvestmentsById(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.SHARES_INVESTMENT_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSharesInvestments(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.SHARES_INVESTMENT_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  getAllByProductId(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.SHARES_INVESTMENT_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_ALL_BY_PRODUCT_ID);
  }

  getAllSharesInvestmentAccountsByPacsIdAndBranchId(pacsId: any, branchId: any) {
    let headers = new HttpHeaders({ 'pacsId': pacsId + '', 'branchId': branchId })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.SHARES_INVESTMENT_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_ALL_SHARE_INVESTMENT_ACCOUNTS_BY_PAC_ID_AND_BRANCH_ID);
  }

  //product resource

  getAllActiveProductsBasedOnPacsId(pacsId: any) {
    let headers = new HttpHeaders({ 'pacsId': pacsId + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.PRODUCTS + ERP_TRANSACTION_CONSTANTS.GET_ALL_ACTIVE_PRODUCTS_BASED_ON_PACS_ID);
  }

  getProductById(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.PRODUCTS + ERP_TRANSACTION_CONSTANTS.GET);
  }
}
