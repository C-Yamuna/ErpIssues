import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class FdCummulativeAccountsTransactionsService {
  constructor(private commonHttpService: CommonHttpService) { }

  updateFdCummulativeAccountsTransactions(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_JOINT_ACC_HOLDER_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addFdCummulativeAccountsTransactions(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_JOINT_ACC_HOLDER_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getFdCummulativeAccountsTransactionsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_JOINT_ACC_HOLDER_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllFdCummulativeAccountsTransactions(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_JOINT_ACC_HOLDER_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteFdCummulativeAccountsTransactions(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_JOINT_ACC_HOLDER_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
