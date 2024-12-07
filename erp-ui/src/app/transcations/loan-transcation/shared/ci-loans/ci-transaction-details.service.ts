import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class CiTransactionDetailsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateCiTransactionDetails(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.CI_TRANSACTION_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addCiTransactionDetails(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.CI_TRANSACTION_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getCiTransactionDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_TRANSACTION_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllCiTransactionDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_TRANSACTION_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteCiTransactionDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_TRANSACTION_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getAllTransactionDetailsByModuleType(moduleType: string) {
    let headers = new HttpHeaders({ 'moduleType': moduleType + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_TRANSACTION_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL_TRANSACTION_DETAILS_DETAILS_BY_MODULE_TYPE);
  }
  getAllTransactionDetailsByLoanApplicationId(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_TRANSACTION_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL_TRANSACTION_DETAILS_BY_LOAN_APPLICATION_ID);
  }
}
