import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SavingsBankJointAccountService {

  constructor(private commonHttpService:CommonHttpService) { }

  
  updateSbJointAccountDetails(object:any){
    return this.commonHttpService.put(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.SAVING_JOINT_ACCOUNT_HOLDER_DETAILS + Configuration.UPDATE);
  }

  addSbJointAccountDetails(object:any){
    return this.commonHttpService.post(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.SAVING_JOINT_ACCOUNT_HOLDER_DETAILS+ Configuration.ADD);
  }

  getAllSbJointAccountDetails(){
    return this.commonHttpService.getAll(Configuration.DEMANDDEPOSITS + Configuration.SAVING_JOINT_ACCOUNT_HOLDER_DETAILS + Configuration.GET_ALL);
  }

  getSbJointAccountDetailsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.DEMANDDEPOSITS + Configuration.SAVING_JOINT_ACCOUNT_HOLDER_DETAILS + Configuration.GET);
  }

  deleteSbJointAccountDetails(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.DEMANDDEPOSITS + Configuration.SAVING_JOINT_ACCOUNT_HOLDER_DETAILS + Configuration.DELETE);
  }

  getAllSbJointAccountDetailsBySbId(id:any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers, Configuration.DEMANDDEPOSITS + Configuration.SAVING_JOINT_ACCOUNT_HOLDER_DETAILS + Configuration.GET_SB_ACCOUNT_HOLDER_DETAILS_BY_SB_ID);
  }

  checkAdmissionNumberInDb(admissionNumber : any){
    let headers = new HttpHeaders({ 'admissionNumber': admissionNumber + '', })
    return this.commonHttpService.getById( headers, Configuration.DEMANDDEPOSITS + Configuration.SAVING_JOINT_ACCOUNT_HOLDER_DETAILS + Configuration.GET);
  }

  saveJointHolderListSave(jointHolderList:any){
    let headers = new HttpHeaders({})
    return this.commonHttpService.post(jointHolderList, headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + Configuration.SAVING_JOINT_ACCOUNT_HOLDER_DETAILS+ ERP_TRANSACTION_CONSTANTS.SAVE_JOINT_HOLDER_LIST);
  }
}
