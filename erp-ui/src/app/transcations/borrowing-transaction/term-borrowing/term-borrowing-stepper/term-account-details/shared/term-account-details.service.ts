import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
export type stepperDataModel = {
  stepperIndex?: number;
  data?: any;
  formValid?: boolean,
  method?:any;
  url?: string;
  isObjChanged?:boolean;
  isDisable?:boolean;
  showFile?:boolean;
} | null;
@Injectable({
  providedIn: 'root'
})
export class TermAccountDetailsService {

  private membershipStepper = new BehaviorSubject<stepperDataModel>(null);
  public currentStep = this.membershipStepper.asObservable();

  changeData(data: stepperDataModel) {
    this.membershipStepper.next(data)
  }

  constructor(private commonHttpService:CommonHttpService) { }

  updateTermAccountDetails(termborrowingsModel:any){
    return this.commonHttpService.put(termborrowingsModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addTermAccountDetails(termborrowingsModel:any){
    return this.commonHttpService.post(termborrowingsModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_BORROWING_ACCOUNTS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllTermAccountDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getTermAccountDetailsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteTermAccountDetails(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  getPreviewDataByBorrowingAccountId(borrowingAccountId: any){
    let headers = new HttpHeaders({ 'borrowingAccountId': borrowingAccountId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_PREVIEW_DATA_BY_BORROWING_ACCOUNTID);
  }

  getBorrowingAccountsListByProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_BORROWING_ACCOUNTS_LIST_BY_PRODUCTID);
  }
  getBorrowingAccountsListByPacsIdAndBranchId(pacsId: any, id: any){
    let headers = new HttpHeaders({ 'pacsId': pacsId + '', 'id': id + ''})
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_BORROWING_ACCOUNTS_LIST_BY_PACSID_AND_BRANCHID);
  }
  getAllfinanciarBankDetais(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.FINANCIAR_BANK_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  getAllActiveProductsBasedOnPacsId(pacsId: any){
    let headers = new HttpHeaders({ 'pacsId': pacsId + ''})
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCTS + ERP_TRANSACTION_CONSTANTS.GET_ALL_ACTIVE_PRODUCTS_BASED_ON_PACSID);
  }
  
  getAllProductPurposeConfigs(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_PURPOSE_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  getAllPurposeByProductId(id: any){
    let headers = new HttpHeaders({ 'id': id + ''})
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_PRODUCT_PURPOSE_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL_BY_PRODUCTID);
  }
  getProductById(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.TERM_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }
}
