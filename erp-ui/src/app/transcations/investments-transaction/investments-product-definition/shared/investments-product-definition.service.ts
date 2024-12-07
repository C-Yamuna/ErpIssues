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
  savedId?:any;
  isObjChanged?:boolean;
  isDisable?:boolean;
  showFile?:boolean;
} | null;

@Injectable({
  providedIn: 'root'
})

export class InvestmentsProductDefinitionService {
  private recurringDepositProductDefinitionStepper = new BehaviorSubject<stepperDataModel>(null);
  public currentStep = this.recurringDepositProductDefinitionStepper.asObservable();

  changeData(data: stepperDataModel) {
    this.recurringDepositProductDefinitionStepper.next(data)
  }

  constructor(private commonHttpService:CommonHttpService) { }

  updateInvestmentProduct(object: any) {
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.INVESTMENTS_PRODUCTS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addInvestmentProduct(object: any) {
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.INVESTMENTS_PRODUCTS + ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllProducts() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.INVESTMENTS_PRODUCTS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getProductById(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.INVESTMENTS_PRODUCTS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteProduct(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.INVESTMENTS_PRODUCTS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  updateInvestmentProductStatus(object: any) {
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.INVESTMENTS_PRODUCTS + ERP_TRANSACTION_CONSTANTS.UPDATE_PRODUCT_STATUS);
  }

  getPreviewByProductId(productId: any) {
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.INVESTMENTS_PRODUCTS + ERP_TRANSACTION_CONSTANTS.GET_PREVIEW_BY_PRODUCT_ID);
  }

  getAllActiveProductsBasedOnPacsId(pacsId: any) {
    let headers = new HttpHeaders({ 'pacsId': pacsId + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.INVESTMENTS_PRODUCTS + ERP_TRANSACTION_CONSTANTS.GET_ALL_ACTIVE_PRODUCTS_BASED_ON_PACS_ID);
  }
  
}
