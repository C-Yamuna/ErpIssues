import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class TermLoanLinkedSharecapitalConfigsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateTermLoanLinkedSharecapitalConfigs(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.TERM_LOAN_LINKED_SHARECAPITAL_CONFIGS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addTermLoanLinkedSharecapitalConfigs(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.TERM_LOAN_LINKED_SHARECAPITAL_CONFIGS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getTermLoanLinkedSharecapitalConfigsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_LOAN_LINKED_SHARECAPITAL_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllTermLoanLinkedSharecapitalConfigs(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_LOAN_LINKED_SHARECAPITAL_CONFIGS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteTermLoanLinkedSharecapitalConfigs(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_LOAN_LINKED_SHARECAPITAL_CONFIGS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
