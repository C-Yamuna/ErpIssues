import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class TermLoanGenealogyTreeService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateTermLoanGenealogyTree(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.TERM_LOAN_GENEALOGY_TREE + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addTermLoanGenealogyTree(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.TERM_LOAN_GENEALOGY_TREE + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getTermLoanGenealogyTreeById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_LOAN_GENEALOGY_TREE + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllTermLoanGenealogyTree(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_LOAN_GENEALOGY_TREE + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteTermLoanGenealogyTree(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_LOAN_GENEALOGY_TREE + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getTermGenealogyTreeDetailsByLoanApplicationId(id:string){
    let headers = new HttpHeaders({'id':id+''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_LOAN_GENEALOGY_TREE + ERP_TRANSACTION_CONSTANTS.GET_TERM_GENEALOGY_TREE_DETAILS_BY_LOAN_APPLICATION_ID)
  }
}
