import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { Configuration } from 'src/app/configurations/configurations-constants';
@Injectable({
  providedIn: 'root'
})
export class SiTransactionDetailsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateSITransactionDetails(loansModel: any) {
    return this.commonHttpService.put(loansModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_APPLICATION + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }

  addSITransactionDetails(loansModel: any) {
    return this.commonHttpService.post(loansModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_APPLICATION + ERP_TRANSACTION_CONSTANTS.ADD)
  }

  getSITransactionDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_APPLICATION + ERP_TRANSACTION_CONSTANTS.GET);
  }

  getAllSITransactionDetails() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_APPLICATION + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  deleteSITransactionDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_APPLICATION + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  getAllProducts() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getAllRepaymentFrequency() {
    return this.commonHttpService.getAll(Configuration.LOANS + Configuration.REPAYMENT_FREQUENCY + Configuration.GET_ALL);
  }

  getAllLoanPurpose() {
    return this.commonHttpService.getAll(Configuration.LOANS + Configuration.LOAN_PURPOSE + Configuration.GET_ALL);
  }

  getAllAccountTypes() {
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.ACCOUNTS_TYPES + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  // getAllSchemeTypes() {
  //   return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SCHEME_TYPES + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  // }

  // getAllAccountTypes() {
  //   return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.ACCOUNT_TYPES + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  // }

  getAllInsuranceVendors() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.INSURANCE_VENDOR_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getAllOccupationTypes() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.OCCUPATION_TYPES + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getAllGenders() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.COMMON_MASTER + Configuration.GENDER + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getAllRelationShipTypes() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.COMMON_MASTER + Configuration.RELATIONSHIP_TYPES + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getAllDistrictsByStateId(id: Number) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, Configuration.COMMON_MASTER + Configuration.DISTRICT + Configuration.GET_DISTRICT_BY_STATE_ID);
  }

  getAllSubDistrictsByDistrictId(id: Number) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, Configuration.COMMON_MASTER + Configuration.SUB_DISTRICT + Configuration.GET_SUB_DISTRICTS_BY_DISTRICT_ID);
  }

  getAllVillagesBySubDistrictId(id: Number) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, Configuration.COMMON_MASTER + Configuration.SUB_DISTRICT + Configuration.GET_SUB_DISTRICTS_BY_DISTRICT_ID);
  }

}
