import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SbNomineeService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSbNominee(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_NOMINEE + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSbNominee(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_NOMINEE + ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getNomineeDetailsByAccountNumber(accountNumber:any){
    let headers = new HttpHeaders({'accountNumber': accountNumber + ''})
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_NOMINEE + ERP_TRANSACTION_CONSTANTS.GET_NOMINEE_DETAILS_BY_ACCOUNT_NUMBER);
  }

  getAllSbNominee(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_NOMINEE + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSbNomineeById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_NOMINEE + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSbNominee(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_NOMINEE + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
