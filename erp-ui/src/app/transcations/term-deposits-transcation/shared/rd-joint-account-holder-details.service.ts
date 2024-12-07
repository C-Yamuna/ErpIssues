import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';
import { TermDepostModel } from './term-depost-model.model';

@Injectable({
  providedIn: 'root'
})
export class RdJointAccountHolderDetailsService {

  constructor(private commonHttpService : CommonHttpService) { }
  updateRdJointAccHolderDetails(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_JOINT_ACC_HOLDER_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addRdJointAccHolderDetails(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_JOINT_ACC_HOLDER_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getAllRdJointAccHolderDetails() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_JOINT_ACC_HOLDER_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getRdJointAccHolderDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_JOINT_ACC_HOLDER_DETAILS + ERP_TRANSACTION_CONSTANTS.GET)
  }
  deleteRdJointAccHolderDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_JOINT_ACC_HOLDER_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE)
  }
}
