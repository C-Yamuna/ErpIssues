import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';
import { TermDepostModel } from './term-depost-model.model';
import { Configuration } from 'src/app/configurations/configurations-constants';
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
export class RdAccountsService {

  private recurringDepositApplicaiton = new BehaviorSubject<stepperDataModel>(null);
  public currentStep = this.recurringDepositApplicaiton.asObservable();

  constructor(private commonHttpService:CommonHttpService) { }
  changeData(data: stepperDataModel) {
    this.recurringDepositApplicaiton.next(data)
  }

  public resetCurrentStep() {
    this.recurringDepositApplicaiton.next(null); // or initial value
  }

  updateRbAccounts(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSbInterestCalculation(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.SB_INTEREST_CALCULATION)
  }
  saveRdInstallmentsOnAccountApproval(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.SAVE_RD_INSTALLMENTS_ON_ACCOUNT_APPROVAL)
  }
  saveRdAccountOnClosureOrForeCLosure (TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.SAVE_RD_ACCOUNT_ON_CLOSURE_OR_FORE_CLOSURE)
  }
  saveAccountOnRenewal(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.SAVE_ACCOUNT_ON_RENEWAL)
  }
  getRdMaturityAmountOnForeclosure(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_RD_MATURITY_AMOUNT_ON_FORECLOSURE)
  }
  getRdMaturityAmountOnClosure(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_RD_MATURITY_AMOUNT_ON_CLOSURE)
  }
  getRdInterestPolicyConfig(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_RD_INTEREST_POLICY_CONFIG)
  }
  addRdAccounts(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getAllRdAccounts() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getRdAccounts(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET)
  }
  deleteWorkFlowSteps(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.DELETE)
  }
  getRdTransactionsByAccountIdAndTransactionType(id: string , transactionType: string) {
    let headers = new HttpHeaders({ 'id': id + '' ,'transactionType': transactionType+''})
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_RD_TRNASACTIONS_BY_ACCOUNT_ID_AND_TRANSACTION_TYPE)
  }
  getRdInstallmentsByAmount(id: string , transactionType: string) {
    let headers = new HttpHeaders({ 'id': id + '' ,'transactionType': transactionType+''})
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_RD_INSTALLMENTS_BY_ACCOUNT_ID)
  }
  getRdAccountsWithAllInstallmentsAndTransactions(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_RD_ACCOUNTS_WITH_ALL_INSTALLMENTS_AND_TRANSACTIONS)
  }
  getRdAccountsByPacsAndBranchId(pacsId: any , branchId: any) {
    let headers = new HttpHeaders({ 'pacsId': pacsId + '' ,'branchId': branchId+''})
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_RD_ACCOUNTS_BY_PACS_AND_BRANCHID)
  }
  getRdAccountDetailsByAdmissionNumberAndId(admissionNumber: string , id: string) {
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '' ,'id': id+''})
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.GET_RD_ACCOUNT_DETAILS_BY_ADMISSION_NUMBER_AND_ID)
  }

  getAllMembershipDetailsFromMembership(pacsId:any,branchId:any){
    let headers = new HttpHeaders({ 'pacsId': pacsId + '' , 'branchId': branchId+''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_BASIC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL_GRID);
  }

  getAllMemberTypes(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.MEMBER_TYPES + Configuration.GET_ALL);
  }

  getMembershipBasicDetailsByAdmissionNumber(admissionNumber: any) {
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_BASIC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_MEMBER_BY_ADMISSION_NUMBER);
  }

  getMemberIstitutionByAdmissionNumber(admissionNumber: any) {
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEM_INSTITUTIONS + ERP_TRANSACTION_CONSTANTS.GET_INSTITUTION_BY_ADMISSION_NUMBER);
  }

  getMemberGroupByAdmissionNumber(admissionNumber: any) {
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_GROUP_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_GROUP_BY_ADMISSION_NUMBER);
  }


  getNomineeFromMembeshipByAdmissionNumber(admissionNumber: any) {
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_BASIC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_MEMBER_BY_ADMISSION_NUMBER);
  }

  getGardianFromMemberModuleByAdmissionNumber(admissionNumber: any){
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.MEMBER_GUARDIAN_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_GUARDAIN_BY_ADMISSION_NUMBER);
  }
  

  getstatesList(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.STATE + Configuration.GET_ALL);
  }
  getDistrictsList(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.DISTRICT + Configuration.GET_ALL);
  }
  getMandalsList(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.SUB_DISTRICT + Configuration.GET_ALL);
  }
  getVillageList(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.VILLAGES + Configuration.GET_ALL);
  }
  getDistrictsByStateId(id : any){
    let headers = new HttpHeaders({ 'stateId': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.DISTRICT + Configuration.GET_DISTRICT_BY_STATE_ID);
  }
  getSubDistrictByDistrictId(id : any){
    let headers = new HttpHeaders({ 'districtId': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.SUB_DISTRICT + Configuration.GET_SUB_DISTRICTS_BY_DISTRICT_ID);
  }
  getvillagesBySubDistrictId(id : any){
    let headers = new HttpHeaders({ 'subDistrictId': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.VILLAGES + Configuration.GET_VILLAGES_BY_SUB_DISTRICT_ID);
  }

  getAllRelationTypes(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.RELATIONSHIP_TYPES + Configuration.GET_ALL);
  }

  getAllAccountTypesList(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.ACCOUNTS_TYPES + Configuration.GET_ALL);
  }

  getQualificationTypes(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.OCCUPATION_TYPES + Configuration.GET_ALL);
  }

  getCastes(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.CASTE + Configuration.GET_ALL);
  }

  getAllOperationTypes(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.OPERATION_TYPES + Configuration.GET_ALL);
  }

  updateCommunication(object:any){
    return this.commonHttpService.put(object, Headers, Configuration.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_COMMUNICATION + Configuration.UPDATE);
  }

  addCommunication(object:any){
    return this.commonHttpService.post(object, Headers, Configuration.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_COMMUNICATION+ Configuration.ADD);
  }

  getApprovedRdProducts(){
    return this.commonHttpService.getAll(Configuration.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_PRODUCT_DEFINITION + Configuration.GET_APPROVED_RD_PRODUCT_DEFINITION);
  }

  getProductById(rdProductId:any){
    let headers = new HttpHeaders({ 'rdProductId': rdProductId + '', })
    return this.commonHttpService.getById( headers, Configuration.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_PRODUCT_DEFINITION + Configuration.GET_BY_RD_PRODUCT_ID);
  }

  getMemBasicDetailsFromTdModule(admissionNumber: string) {
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_BASIC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_MEMBERSHIP_BASIC_DETAILS_BY_ADMISSION_NO)
  }
  

  getMemGroupDetailsFromTdModule(admissionNumber: string) {
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.MEMBERSHIP_GROUP_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_MEMBER_DETAILS_BY_ADMISSION_NUMBER)
  }

  getMemInstituteDetailsFromTdModule(admissionNumber: string) {
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.MEM_INSTITUTIONS + ERP_TRANSACTION_CONSTANTS.GET_MEMBER_DETAILS_BY_ADMISSION_NUMBER)
  }

  addJointHolders(jointHoldersList: any) {
    return this.commonHttpService.post(jointHoldersList,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_JOINT_ACC_HOLDER_DETAILS + ERP_TRANSACTION_CONSTANTS.SAVE_JOINT_HOLDER_LIST)
  }

  getRdJointAccHolderDetails(id: any) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_JOINT_ACC_HOLDER_DETAILS + ERP_TRANSACTION_CONSTANTS.GET)
  }

  updateNominee(object:any){
    return this.commonHttpService.put(object, Headers, Configuration.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_NOMINEES + Configuration.UPDATE);
  }

  saveNominee(object:any){
    return this.commonHttpService.post(object, Headers, Configuration.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_ACCOUNT_NOMINEES + Configuration.ADD);
  }

  getRequiredDocumentListByProdId(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_REQUIRED_DOCUMENT_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_REQUIRED_DOCUMENTS_CONFIG_BY_PRODUCT_ID)
  }

  getAllDocuementsTypes(){
    return this.commonHttpService.getAll(Configuration.TERMDEPOSITS + Configuration.DOC_TYPES + Configuration.GET_ALL);
  }

  saveRequiredDocument(object:any){
    return this.commonHttpService.post(object, Headers, Configuration.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_REQUIRED_DOCUMENT_DETAILS + Configuration.ADD);
  }

  updateRequiredDocument(object:any){
    return this.commonHttpService.put(object, Headers, Configuration.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_REQUIRED_DOCUMENT_DETAILS + Configuration.UPDATE);
  }

  getDocuments(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_REQUIRED_DOCUMENT_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getRdRequiredDocsByAccId(id: any) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_REQUIRED_DOCUMENT_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_REQUIRED_DOCUMENT_DETAILS_BY_ACC_ID)
  }

  // deleteRequiredDocument(object:any){
  //   return this.commonHttpService.delete(object, Headers, Configuration.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_REQUIRED_DOCUMENT_DETAILS + Configuration.DELETE);
  // }
  deleteRequiredDocument(id: any) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_REQUIRED_DOCUMENT_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE)
  }

  getMaturityDetails(object:any){
    return this.commonHttpService.post(object, Headers, Configuration.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_ACCOUNTS + Configuration.GET_RD_MATURITY_AMOUNT_ON_CLOSER);
  }

  updateRdApplicationWithMemberModuleDetails(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_ACCOUNTS + ERP_TRANSACTION_CONSTANTS.UPDATE_RD_ACCOUNT_WITH_MEMBER_MODULE);
  }
  
  addRdApplicationWithMemberModuleDetails(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.RD_ACCOUNTS+ ERP_TRANSACTION_CONSTANTS.ADD_RD_ACCOUNT_WITH_MEMBER_MODULE);
  }
}
