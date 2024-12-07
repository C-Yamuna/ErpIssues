import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class SaoCashTransactionDenominationService {
  constructor(private commonHttpService: CommonHttpService) { }

  updateSaoCashTransactionDenomination(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SAO_CASH_TRANSACTION_DENOMINATION + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSaoCashTransactionDenomination(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SAO_CASH_TRANSACTION_DENOMINATION + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSaoCashTransactionDenominationById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_CASH_TRANSACTION_DENOMINATION + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSaoCashTransactionDenomination(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_CASH_TRANSACTION_DENOMINATION + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSaoCashTransactionDenomination(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_CASH_TRANSACTION_DENOMINATION + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
