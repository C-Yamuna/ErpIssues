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
export class SiBorrowingStepperService {
  constructor(private commonHttpService:CommonHttpService) { }
  
  private membershipStepper = new BehaviorSubject<stepperDataModel>(null);
  public currentStep = this.membershipStepper.asObservable();

  changeData(data: stepperDataModel) {
    this.membershipStepper.next(data)
  }
  updateSiBorrowingStepper(siborrowingsModel:any){
    return this.commonHttpService.put(siborrowingsModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSiBorrowingStepper(siborrowingsModel:any){
    return this.commonHttpService.post(siborrowingsModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_ACCOUNTS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllSiBorrowingStepper(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSiBorrowingStepperById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSiBorrowingStepper(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getPreviewDataBySiBorrowingAccountId(borrowingAccountId: any){
    let headers = new HttpHeaders({ 'borrowingAccountId': borrowingAccountId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_PREVIEW_DATA_BY_SI_BORROWING_ACCOUNTID);
  }
  
  getSiBorrowingAccountsListByProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_SI_BORROWING_ACCOUNTS_LIST_BY_PRODUCTID);
  }
  getSiBorrowingAccountsListByPacsIdAndBranchId(pacsId: any, id: any){
    let headers = new HttpHeaders({ 'pacsId': pacsId + '', 'id': id + ''})
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_SI_BORROWING_ACCOUNTS_LIST_BY_PACSID_AND_BRANCHID);
  }
  getAllfinanciarBankDetais(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.FINANCIAR_BANK_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  getAllActiveProductsBasedOnPacsId(pacsId: any){
    let headers = new HttpHeaders({ 'pacsId': pacsId + ''})
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_PRODUCTS + ERP_TRANSACTION_CONSTANTS.GET_ALL_ACTIVE_PRODUCTS_BASED_ON_PACSID);
  }
  getAllSiProductPurposeConfigs(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_PURPOSE_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  getAllPurposeByProductId(id: any){
    let headers = new HttpHeaders({ 'id': id + ''})
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_PURPOSE_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL_BY_PRODUCTID);
  }
  getProductById(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_INTEREST_POLICY_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }
}
