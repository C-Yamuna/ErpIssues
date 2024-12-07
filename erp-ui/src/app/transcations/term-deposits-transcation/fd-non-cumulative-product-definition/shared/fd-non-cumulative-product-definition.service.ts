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
export class FdNonCumulativeProductDefinitionService {

  private termDepositProductDefinitionStepper = new BehaviorSubject<stepperDataModel>(null);
  public currentStep = this.termDepositProductDefinitionStepper.asObservable();

  changeData(data: stepperDataModel) {
    this.termDepositProductDefinitionStepper.next(data)
  }
  constructor(private commonHttpService:CommonHttpService) { }
  

  updateFdNonCumulativeProductDefinition(generalConfigModel:any){
    return this.commonHttpService.put(generalConfigModel, Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_NON_CUMULATIVE_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }
  addFdNonCumulativeProductDefinition(generalConfigModel:any){
    return this.commonHttpService.post(generalConfigModel, Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_NON_CUMULATIVE_PRODUCT_DEFINITION+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getFdNonCumulativeProductDefinitionOverviewDetailsById(id: any) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_NON_CUMULATIVE_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET_PRODUCT_OVERVIEW_BY_ID);
  }
  getFdNonCumulativeProductDefinitionByProductId(id: any) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_NON_CUMULATIVE_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET_BY_PRODUCTID);
  }
  getAllFdNonCumulativeProductDefinition(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_NON_CUMULATIVE_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  getFdCummulativeFdNonCumulativeProductDefinitionById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_NON_CUMULATIVE_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET);
  }
 
 

 


 

}
