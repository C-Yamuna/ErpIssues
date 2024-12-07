import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

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
export class TermDepositProductDefinitionService {
  private termDepositProductDefinitionStepper = new BehaviorSubject<stepperDataModel>(null);
  public currentStep = this.termDepositProductDefinitionStepper.asObservable();

  changeData(data: stepperDataModel) {
    this.termDepositProductDefinitionStepper.next(data)
  }
  constructor(private commonHttpService:CommonHttpService) { }
  
  getAllFdCummulativeProductDefinations(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  getFdCummulativeById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET);
  }
  updateFdCummulativeProductDefination(generalConfigModel:any){
    return this.commonHttpService.put(generalConfigModel, Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addFdCummulativeProductDefination(generalConfigModel:any){
    return this.commonHttpService.post(generalConfigModel, Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_PRODUCT_DEFINITION+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getFdCumulativeProductDefinitionOverviewDetailsById(id: any) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET_PRODUCT_OVERVIEW_BY_ID);
  }

  updateInterestPolicy(interestPolicyModel: any) {
    return this.commonHttpService.put(interestPolicyModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_INTEREST_POLICY_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addInterestPolicy(interestPolicyModel: any) {
    return this.commonHttpService.post(interestPolicyModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_INTEREST_POLICY_CONFIG + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getFdCumulativeinterestpolicyDetailsByProductId(productId: any) {
    let headers = new HttpHeaders({ 'productId': productId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_INTEREST_POLICY_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_INTERST_POLICY_CONFIG_BY_PRODUCT_ID);
  }
  updateRequiredDocuments(interestPolicyModel: any) {
    return this.commonHttpService.put(interestPolicyModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_REQUIRED_DOCUMENTS_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addRequiredDocuments(interestPolicyModel: any) {
    return this.commonHttpService.post(interestPolicyModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_REQUIRED_DOCUMENTS_CONFIG + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getFdCumulativeRequiredDocumentsByProductId(productId: any) {
    let headers = new HttpHeaders({ 'productId': productId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_REQUIRED_DOCUMENTS_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_REQUIRED_DOCUMENTS_CONFIG_BY_PRODUCT_ID);
  }
  getAllDocumentTypes(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.DOCUMENT_TYPES + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
}
