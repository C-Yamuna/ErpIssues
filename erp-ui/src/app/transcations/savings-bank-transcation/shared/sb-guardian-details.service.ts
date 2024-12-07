import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SbGuardianDetailsService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSbGuardianDetails(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_GUARDIAN_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSbGuardianDetails(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_GUARDIAN_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD);
  }
  
  getGuardianDetailsByAccountNumber(accountNumber:any){
    let headers = new HttpHeaders({'accountNumber': accountNumber + ''})
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_GUARDIAN_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_GUARDIAN_DETAILS_BY_ACCOUNT_NUMBER);
  }

  getAllSbGuardianDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_GUARDIAN_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSbGuardianDetailsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_GUARDIAN_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSbGuardianDetails(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_GUARDIAN_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
