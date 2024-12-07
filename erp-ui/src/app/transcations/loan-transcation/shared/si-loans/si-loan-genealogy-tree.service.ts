import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { Configuration } from 'src/app/configurations/configurations-constants';
@Injectable({
  providedIn: 'root'
})
export class SiLoanGenealogyTreeService {
  constructor(private commonHttpService: CommonHttpService) { }

  updateSILoanGenealogyTree(loansModel: any) {
    return this.commonHttpService.put(loansModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_GENEALOGY_TREE + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSILoanGenealogyTree(loansModel: any) {
    return this.commonHttpService.post(loansModel, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_GENEALOGY_TREE + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSILoanGenealogyTreeById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_GENEALOGY_TREE + ERP_TRANSACTION_CONSTANTS.GET_SI_GENEALOGY_TREE_DETAILS_BY_LOAN_APPLICATION_ID);
  }
  getAllSILoanGenealogyTree() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_GENEALOGY_TREE + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSILoanGenealogyTree(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_GENEALOGY_TREE + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getSIGenealogyTreeDetailsByLoanApplicationId(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_GENEALOGY_TREE + ERP_TRANSACTION_CONSTANTS.GET_SI_GENEALOGY_TREE_DETAILS_BY_LOAN_APPLICATION_ID);
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
  getInstitutionDetails(id: any) {
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers, Configuration.LOANS + Configuration.INSTITUTION + Configuration.GET);
  }
  getAllRelationshipTypes() {
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.RELATIONSHIP_TYPES + Configuration.GET_ALL);
  }

}
