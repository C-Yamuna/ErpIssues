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
export class RecurringDepositProductDefinitionService {
  private recurringDepositProductDefinitionStepper = new BehaviorSubject<stepperDataModel>(null);
  public currentStep = this.recurringDepositProductDefinitionStepper.asObservable();

  changeData(data: stepperDataModel) {
    this.recurringDepositProductDefinitionStepper.next(data)
  }
  constructor(private commonHttpService:CommonHttpService) { }
  

  updateRecurringDepositProductDefinition(generalConfigModel:any){
    return this.commonHttpService.put(generalConfigModel, Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }
  addRecurringDepositProductDefinition(generalConfigModel:any){
    return this.commonHttpService.post(generalConfigModel, Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_PRODUCT_DEFINITION+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getRecurringDepositProductDefinitionOverviewDetailsById(id: any) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET_PRODUCT_OVERVIEW_BY_ID);
  }
  getRecurringDepositProductDefinitionByProductId(id: any) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET_BY_RD_PRODUCT_ID);
  }
  getAllRecurringDepositProductDefinition(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  getRecurringDepositProductDefinitionById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET);
  }
}
