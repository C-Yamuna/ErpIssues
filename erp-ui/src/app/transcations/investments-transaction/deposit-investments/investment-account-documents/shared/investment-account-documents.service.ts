import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class InvestmentAccountDocumentsService {

  constructor(private commonHttpService:CommonHttpService) { }
  
  updateInvestmentAccountDocuments(investmentAccountDocumentsModel: any) {
    return this.commonHttpService.put(investmentAccountDocumentsModel, Headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.INVESTMENT_ACCOUNT_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addInvestmentAccountDocuments(investmentAccountDocumentsModel: any) {
    return this.commonHttpService.post(investmentAccountDocumentsModel, Headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.INVESTMENT_ACCOUNT_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllInvestmentAccountDocuments() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.INVESTMENT_ACCOUNT_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getInvestmentAccountDocumentsById(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.INVESTMENT_ACCOUNT_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteInvestmentAccountDocuments(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.INVESTMENT_ACCOUNT_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  getAllByTermAccountId(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.INVESTMENT_ACCOUNT_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.GET_ALL_BY_TERM_ACCOUNT_ID);
  }

  getAllByProductId(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.INVESTMENT_ACCOUNT_DOCUMENTS + ERP_TRANSACTION_CONSTANTS.GET_ALL_BY_PRODUCT_ID);
  }
}
