import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Configuration } from 'src/app/configurations/configurations-constants';
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
export class SavingBankApplicationService {

  private organizationDetailsStepper = new BehaviorSubject<stepperDataModel>(null);
  public currentStep = this.organizationDetailsStepper.asObservable();

  public resetCurrentStep() {
    this.organizationDetailsStepper.next(null); // or initial value
  }

  constructor(private commonHttpService:CommonHttpService) { }
  changeData(data: stepperDataModel) {
    this.organizationDetailsStepper.next(data)
  }

  getAllRelationTypes(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.RELATIONSHIP_TYPES + Configuration.GET_ALL);
  }
  updateSbApplication(object:any){
    return this.commonHttpService.put(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.SAVING_ACCOUNT + Configuration.UPDATE);
  }

  addSbApplication(object:any){
    return this.commonHttpService.post(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.SAVING_ACCOUNT+ Configuration.ADD);
  }

  getAllSbApplication(){
    return this.commonHttpService.getAll(Configuration.DEMANDDEPOSITS + Configuration.SAVING_ACCOUNT + Configuration.GET_ALL);
  }

  getSbApplicationById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.DEMANDDEPOSITS + Configuration.SAVING_ACCOUNT + Configuration.GET);
  }

  deleteSbApplication(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.DEMANDDEPOSITS + Configuration.SAVING_ACCOUNT + Configuration.DELETE);
  }

  updateMembership(object:any){
    return this.commonHttpService.put(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.MEMBERSHIP_BASIC_DETAILS + Configuration.UPDATE);
  }

  addMembership(object:any){
    return this.commonHttpService.post(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.MEMBERSHIP_BASIC_DETAILS+ Configuration.ADD);
  }
  getMemberById(id:any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers , Configuration.DEMANDDEPOSITS + Configuration.MEMBERSHIP_BASIC_DETAILS + Configuration.GET);
  }
  getMemberByAdmissionNumber(admissionNumber:any){
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '', })
    return this.commonHttpService.getById(headers , Configuration.DEMANDDEPOSITS + Configuration.MEMBERSHIP_BASIC_DETAILS + Configuration.MEMBER_BY_ADMISSIONUMBER);
  }
  getAllAccountTypesList(){
      return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.ACCOUNTS_TYPES + Configuration.GET_ALL);
  }

  getAllApplicationTypesList(){
    return this.commonHttpService.getAll(Configuration.DEMANDDEPOSITS + Configuration.PRODUCT_DEFINITION + Configuration.GET_ALL);
  }
// getAllGenderList(){
//   return this.commonHttpService.getAll(Configuration.DEMANDDEPOSITS + Configuration.PRODUCT_DEFINITION + Configuration.GET_ALL);
// }
  getAllMaitalList(){
      return this.commonHttpService.getAll(Configuration.LOANS + Configuration.MARITAL_STATUS_TYPES + Configuration.GET_ALL);
  }
  getProduct(id: any){
    let headers = new HttpHeaders({ 'productId': id + '', })
    return this.commonHttpService.getById( headers, Configuration.DEMANDDEPOSITS + Configuration.PRODUCT_DEFINITION + Configuration.ACTIVE_PRODUCT_BYPRODUCT_ID);
  }
  updateGropDetails(object:any){
    return this.commonHttpService.put(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.GROUP + Configuration.UPDATE);
  }

  addGropuDetails(object:any){
    return this.commonHttpService.post(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.GROUP+ Configuration.ADD);
  }

  getGroupById(id:any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers , Configuration.DEMANDDEPOSITS + Configuration.GROUP + Configuration.GET);
  }
  getGroupByAdmissionNumber(admissionNumber:any){
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '', })
    return this.commonHttpService.getById(headers , Configuration.DEMANDDEPOSITS + Configuration.GROUP + Configuration.MEMBER_BY_ADMISSIONUMBER);
  }
  updateInstitutionDetails(object:any){
    return this.commonHttpService.put(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.INSTITUTION + Configuration.UPDATE);
  }

  addInstitutionDetails(object:any){
    return this.commonHttpService.post(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.INSTITUTION+ Configuration.ADD);
  }

  getInstitutionDetails(id:any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers , Configuration.DEMANDDEPOSITS + Configuration.INSTITUTION + Configuration.GET);
  }
  getInstitutionDetailsByAdmissionNumber(admissionNumber:any){
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '', })
    return this.commonHttpService.getById(headers , Configuration.DEMANDDEPOSITS + Configuration.INSTITUTION + Configuration.MEMBER_BY_ADMISSIONUMBER);
  }
  getSbAccountDetailsByAdmissionNumberAndId(id : any ,admissionNumber :any){
    let headers = new HttpHeaders({ 'id': id + '', 'admissionNumber': admissionNumber + ''})
    return this.commonHttpService.getById(headers , Configuration.DEMANDDEPOSITS + Configuration.SAVING_ACCOUNT + Configuration.SB_ACC_DETAILS_BY_ADMISSION_NUMBER_AND_ID);
  }
 
  getSbAccountDetailsByAdmissionNumber(admissionNumber :any){
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + ''})
    return this.commonHttpService.getById(headers , Configuration.DEMANDDEPOSITS + Configuration.SAVING_ACCOUNT + Configuration.SB_ACCOUNT_ADMISSION_NUMBER);
  }
  getAllOperationTypes(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.OPERATION_TYPES + Configuration.GET_ALL);
  }
  addGroupPromoterDetails(object:any){
    return this.commonHttpService.post(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.SB_GROUP_PROMOTER_DETAILS+ Configuration.ADD);
  }
  updateGroupPromoterDetails(object:any){
    return this.commonHttpService.put(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.SB_GROUP_PROMOTER_DETAILS+ Configuration.UPDATE);
  }
  addInstituionPromoterDetails(object:any){
    return this.commonHttpService.post(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.SB_INSTITUTION_PROMOTER_DETAILS+ Configuration.ADD);
  }
  updateInstituionPromoterDetails(object:any){
    return this.commonHttpService.put(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.SB_INSTITUTION_PROMOTER_DETAILS+ Configuration.UPDATE);
  }

  getOccupationTypes(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.OPERATION_TYPES + Configuration.GET_ALL);
  }
  getQualificationTypes(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.OCCUPATION_TYPES + Configuration.GET_ALL);
  }

  getCastes(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.CASTE + Configuration.GET_ALL);
  }

  getMembershipBasicDetailsByMemberId( pacsId: string,branchId: string ) {
    let headers = new HttpHeaders({  'pacsId': pacsId+'','branchId': branchId+''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_BASIC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_MEMBERSHIP_BASIC_DETAILS);
  }

}


