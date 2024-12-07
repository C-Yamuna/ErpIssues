import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class SaoMortgageDetailsSummaryService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateSaoMortgageDetailsSummary(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SAO_MORTGAGE_DETAILS_SUMMARY + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSaoMortgageDetailsSummary(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SAO_MORTGAGE_DETAILS_SUMMARY + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSaoMortgageDetailsSummaryById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_MORTGAGE_DETAILS_SUMMARY + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSaoMortgageDetailsSummary(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_MORTGAGE_DETAILS_SUMMARY + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSaoMortgageDetailsSummary(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_MORTGAGE_DETAILS_SUMMARY + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 
}
