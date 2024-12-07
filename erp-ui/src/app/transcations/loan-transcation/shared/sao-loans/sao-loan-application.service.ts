import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { BehaviorSubject } from 'rxjs';

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
export class SaoLoanApplicationService {

  private organizationDetailsStepper = new BehaviorSubject<stepperDataModel>(null);
  public currentStep = this.organizationDetailsStepper.asObservable();

  public resetCurrentStep() {
    this.organizationDetailsStepper.next(null); // or initial value
  }

  constructor(private commonHttpService: CommonHttpService) { }

  changeData(data: stepperDataModel) {
    this.organizationDetailsStepper.next(data)
  }

  updateSaoLoanApplication(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SAO_LOAN_APPLICATION + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSaoLoanApplication(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SAO_LOAN_APPLICATION + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSaoLoanApplicationById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_APPLICATION + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSaoLoanApplication(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_APPLICATION + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSaoLoanApplication(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_APPLICATION + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  SaoLoanApplicationApproval(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SAO_LOAN_APPLICATION + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_APPLICATION_APPROVAL)
  }
  getSaoLoanApplicationDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_APPLICATION + ERP_TRANSACTION_CONSTANTS.GET_SAO_LOAN_APPLICATION_DETAILS_BY_ID);
  }
  getSaoLoanApplicationDetailsByPacsIdAndBranchId(pacsId: any,branchId: any){
    let headers = new HttpHeaders({ 'pacsId': pacsId + '', 'branchId': branchId + '' })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_APPLICATION + ERP_TRANSACTION_CONSTANTS.GET_SAO_LOAN_APPLICATION_DETAILS_BY_PACS_ID_AND_BRANCH_ID);
  }
  getAllLoanPurposes(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.LOAN_PURPOSES + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getInsurenceDetailsByApplicationId(id: any){
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_INSURANCE_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_INSURENCE_DETAILS_BY_APPLICATION_ID);
  }

  saveJointHoldersList(jointHolderList:any){
    return this.commonHttpService.post( jointHolderList, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_JOINT_MEMS_DETAILS+ ERP_TRANSACTION_CONSTANTS.SAVE_JOINT_HOLDER_LIST);
  }
 
}
