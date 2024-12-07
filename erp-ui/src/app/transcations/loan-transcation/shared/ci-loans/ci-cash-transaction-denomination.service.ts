import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class CiCashTransactionDenominationService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateCiCashTransactionDenomination(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.CI_CASH_TRANSACTION_DENOMINATIONS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addCiCashTransactionDenomination(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.CI_CASH_TRANSACTION_DENOMINATIONS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getCiCashTransactionDenominationById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_CASH_TRANSACTION_DENOMINATIONS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllCiCashTransactionDenomination(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_CASH_TRANSACTION_DENOMINATIONS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteCiCashTransactionDenomination(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_CASH_TRANSACTION_DENOMINATIONS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
