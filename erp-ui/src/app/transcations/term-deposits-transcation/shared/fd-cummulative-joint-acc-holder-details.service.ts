import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class FdCummulativeJointAccHolderDetailsService {

  constructor(private commonHttpService: CommonHttpService) { }

  updateFdCummulativeJointAccHolderDetails(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_JOINT_ACC_HOLDER_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addFdCummulativeJointAccHolderDetails(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_JOINT_ACC_HOLDER_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getFdCummulativeJointAccHolderDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_JOINT_ACC_HOLDER_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllFdCummulativeJointAccHolderDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_JOINT_ACC_HOLDER_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteFdCummulativeJointAccHolderDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_JOINT_ACC_HOLDER_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
