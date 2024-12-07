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
export class SimpleInterestProductDefinitionService {

  private organizationDetailsStepper = new BehaviorSubject<stepperDataModel>(null);
  public currentStep = this.organizationDetailsStepper.asObservable();


  constructor(private commonHttpService: CommonHttpService) { }

  changeData(data: stepperDataModel) {
    this.organizationDetailsStepper.next(data)
  }

  updateSimpleInterestProductDefinition(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSimpleInterestProductDefinition(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSimpleInterestProductDefinitionById(id: any) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSimpleInterestProductDefinition(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSimpleInterestProductDefinition(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 getPreviewDetailsByProductId(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET_SI_PRODUCT_DEFINITION_PREVIEW_BY_PROD_ID);
  }
  getActiveProductsBasedOnPacsId(pacsId: string){
    let headers = new HttpHeaders({ 'pacsId': pacsId + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET_ALL_ACTIVE_PRODUCTS_BASED_ON_PACSID);
  }
  
}
