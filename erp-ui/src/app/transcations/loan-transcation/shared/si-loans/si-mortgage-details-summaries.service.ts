import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class SiMortgageDetailsSummariesService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateSIMortgageDetailsSummaries(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SI_MORTGAGE_DETAILS_SUMMARIES + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSIMortgageDetailsSummaries(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SI_MORTGAGE_DETAILS_SUMMARIES + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSIMortgageDetailsSummariesById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_MORTGAGE_DETAILS_SUMMARIES + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSIMortgageDetailsSummaries(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_MORTGAGE_DETAILS_SUMMARIES + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSIMortgageDetailsSummaries(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_MORTGAGE_DETAILS_SUMMARIES + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 
}
