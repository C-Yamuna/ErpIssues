import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { BehaviorSubject } from 'rxjs';

export type stepperDataModel = {
  formValid?: boolean,
  stepperIndex?: number;
  data?: any;
  method?: any;
  url?: string;
  isObjChanged?: boolean;
  isDisable?: boolean;
} | null;

@Injectable({
  providedIn: 'root'
})
export class SiLoanApplicationService {

  private organizationDetailsStepper = new BehaviorSubject<stepperDataModel>(null);
  public currentStep = this.organizationDetailsStepper.asObservable();

  public resetCurrentStep() {
    this.organizationDetailsStepper.next(null); // or initial value
  }

  constructor(private commonHttpService: CommonHttpService) { }

  changeData(data: stepperDataModel) {
    this.organizationDetailsStepper.next(data)
  }

  updateSILoanApplication(loansModel: any) {
    return this.commonHttpService.put(loansModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_APPLICATION + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }

  addSILoanApplication(loansModel: any) {
    return this.commonHttpService.post(loansModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_APPLICATION + ERP_TRANSACTION_CONSTANTS.ADD)
  }

  getSILoanApplicationById(loanAccId: string) {
    let headers = new HttpHeaders({ 'loanAccId': loanAccId + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_APPLICATION + ERP_TRANSACTION_CONSTANTS.GET_LOAN_APPLICATION_DETAILS_BY_LOAN_APPLICATION_ID);
  }

  getAllSILoanApplication() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_APPLICATION + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  deleteSILoanApplication(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_APPLICATION + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  getLoanApplicationDetailsByLoanApplicationId(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_APPLICATION + ERP_TRANSACTION_CONSTANTS.GET_LOAN_APPLICATION_DETAILS_BY_LOAN_APPLICATION_ID);
  }

  getMemberById(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers, Configuration.LOANS + Configuration.MEMBERSHIP_BASIC_DETAILS + Configuration.GET);
  }

  getAllActiveProductasByPACSId(id: any) {
    let headers = new HttpHeaders({ 'productId': id + '', })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET_ACTIVE_PRODUCTS_BASED_ON_PACSID);
  }

  addMembership(object: any) {
    return this.commonHttpService.post(object, Headers, Configuration.LOANS + Configuration.MEMBERSHIP_BASIC_DETAILS + Configuration.ADD);
  }

  getMembershipBasicDetailsByMemberId(pacsId: string, branchId: string) {
    let headers = new HttpHeaders({ 'pacsId': pacsId + '', 'branchId': branchId + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_BASIC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_MEMBERSHIP_BASIC_DETAILS);
  }

  getMemberByAdmissionNumber(admissionNumber: any) {
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '', })
    return this.commonHttpService.getById(headers, Configuration.LOANS + Configuration.INDIVIDUAL_MEMBER_DETAILS + Configuration.MEMBER_BY_ADMISSIONUMBER);
  }

  getInstitutionDetailsByAdmissionNumber(admissionNumber: any) {
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '', })
    return this.commonHttpService.getById(headers, Configuration.LOANS + Configuration.INSTITUTION + Configuration.MEMBER_BY_ADMISSIONUMBER);
  }

  getGroupByAdmissionNumber(admissionNumber: any) {
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '', })
    return this.commonHttpService.getById(headers, Configuration.LOANS + Configuration.GROUP + Configuration.MEMBER_BY_ADMISSIONUMBER);
  }

  getAllRelationTypes() {
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.RELATIONSHIP_TYPES + Configuration.GET_ALL);
  }

  getAllAccountTypesList() {
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.ACCOUNTS_TYPES + Configuration.GET_ALL);
  }

  getQualificationTypes() {
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.QUALIFICATION + Configuration.GET_ALL);
  }

  getAllCommunityTypes() {
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.COMMUNITY + Configuration.GET_ALL);
  }

  getCastes() {
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.CASTE + Configuration.GET_ALL);
  }

  getAllOperationTypes() {
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.OPERATION_TYPES + Configuration.GET_ALL);
  }

  getInstitutionDetails(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers, Configuration.LOANS + Configuration.INSTITUTION + Configuration.GET);
  }

  getSILoanPreviewDetails(loanAccId: any) {
    let headers = new HttpHeaders({ 'loanAccId': loanAccId + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_APPLICATION + ERP_TRANSACTION_CONSTANTS.GET_LOAN_APPLICATION_DETAILS_BY_LOAN_APPLICATION_ID);
  }

  getProductDefinitionByProductId(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET);
  }

  getAllOccupationTypes() {
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.OCCUPATION_TYPES + Configuration.GET_ALL);
  }

}
