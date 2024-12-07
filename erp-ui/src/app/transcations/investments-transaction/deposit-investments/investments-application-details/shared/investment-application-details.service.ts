import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

export type stepperDataModel = {
  formValid?: boolean,
  stepperIndex?: number;
  data?: any;
  method?:any;
  url?: string;
  isObjChanged?:boolean;
  isDisable?:boolean;
} | null;

@Injectable({
  providedIn: 'root'
})
export class InvestmentApplicationDetailsService {
  
  private organizationDetailsStepper = new BehaviorSubject<stepperDataModel>(null);
  public currentStep = this.organizationDetailsStepper.asObservable();
  
  constructor(private commonHttpService: CommonHttpService) { }

  changeData(data: stepperDataModel) {
    this.organizationDetailsStepper.next(data)
  }

  updateInvestmentApplicationDetails(investmentApplicationDetailsModel: any) {
    return this.commonHttpService.put(investmentApplicationDetailsModel, Headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.TERM_DEPOSIT_INVESTMENT_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  termDepositInvestmentAccountStatus(investmentApplicationDetailsModel: any) {
    return this.commonHttpService.put(investmentApplicationDetailsModel, Headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.TERM_DEPOSIT_INVESTMENT_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.TERM_DEPOSIT_INVESTMENT_ACCOUNT_STATUS);
  }

  addInvestmentApplicationDetails(investmentApplicationDetailsModel: any) {
    return this.commonHttpService.post(investmentApplicationDetailsModel, Headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.TERM_DEPOSIT_INVESTMENT_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.ADD);
  }

  saveForeClosureDetails(investmentApplicationDetailsModel: any) {
    return this.commonHttpService.post(investmentApplicationDetailsModel, Headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.TERM_DEPOSIT_INVESTMENT_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.SAVE_FORE_CLOSURE_DETAILS);
  }

  getRdMaturityAmountOnForeclosure(investmentApplicationDetailsModel: any) {
    return this.commonHttpService.post(investmentApplicationDetailsModel, Headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.TERM_DEPOSIT_INVESTMENT_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_RD_MATURITY_AMOUNT_ON_FORECLOSURE);
  }

  getMarurityAmountOnForeclosure(investmentApplicationDetailsModel: any) {
    return this.commonHttpService.post(investmentApplicationDetailsModel, Headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.TERM_DEPOSIT_INVESTMENT_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_MATURITY_AMOUNT_ON_FORECLOSURE);
  }

  getAllInvestmentApplicationDetails() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.TERM_DEPOSIT_INVESTMENT_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getInvestmentApplicationDetailsById(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.TERM_DEPOSIT_INVESTMENT_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  getPreviewByTermAccountId(termAccountId: any) {
    let headers = new HttpHeaders({ 'termAccountId': termAccountId + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.TERM_DEPOSIT_INVESTMENT_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_PREVIEW_BY_TERM_ACCOUNT_ID);
  }

  getByProductId(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.TERM_DEPOSIT_INVESTMENT_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_BY_PRODUCT_ID);
  }

  getByPacIdAndBranchId(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.TERM_DEPOSIT_INVESTMENT_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_BY_PAC_ID_AND_BRANCH_ID);
  }

  deleteInvestmentApplicationDetails(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.TERM_DEPOSIT_INVESTMENT_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  getAllGrid(pacsId: any, branchId: any) {
    let headers = new HttpHeaders({ 'pacsId': pacsId + '', 'branchId': branchId + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.TERM_DEPOSIT_INVESTMENT_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_ALL_GRID);
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
