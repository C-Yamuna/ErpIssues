import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class TermMortgageDetailsSummariesService {
  constructor(private commonHttpService: CommonHttpService) { }

  updateTermMortgageDetailsSummaries(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.TERM_MORTGAGE_DETAILS_SUMMARIES + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addTermMortgageDetailsSummaries(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.TERM_MORTGAGE_DETAILS_SUMMARIES + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getTermMortgageDetailsSummariesById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_MORTGAGE_DETAILS_SUMMARIES + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllTermMortgageDetailsSummaries(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_MORTGAGE_DETAILS_SUMMARIES + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteTermMortgageDetailsSummaries(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.TERM_MORTGAGE_DETAILS_SUMMARIES + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
