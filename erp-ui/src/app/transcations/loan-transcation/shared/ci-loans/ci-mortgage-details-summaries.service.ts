import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class CiMortgageDetailsSummariesService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateCiMortgageDetailsSummaries(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.CI_MORTGAGE_DETAILS_SUMMARIES + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addCiMortgageDetailsSummaries(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.CI_MORTGAGE_DETAILS_SUMMARIES + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getCiMortgageDetailsSummariesById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_MORTGAGE_DETAILS_SUMMARIES + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllCiMortgageDetailsSummaries(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_MORTGAGE_DETAILS_SUMMARIES + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteCiMortgageDetailsSummaries(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_MORTGAGE_DETAILS_SUMMARIES + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
