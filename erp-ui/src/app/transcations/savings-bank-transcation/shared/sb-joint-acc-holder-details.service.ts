import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SbJointAccHolderDetailsService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSbJointAccHolderDetails(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_JOINT_ACC_HOLDER_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSbJointAccHolderDetails(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_JOINT_ACC_HOLDER_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllSbJointAccHolderDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_JOINT_ACC_HOLDER_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSbJointAccHolderDetailsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_JOINT_ACC_HOLDER_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSbJointAccHolderDetails(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_JOINT_ACC_HOLDER_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
