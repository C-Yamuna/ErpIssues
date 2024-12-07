import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SbStandingInstructionsService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSbStandingInstructions(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_STANDING_INSTRUCTIONS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  getAllByAccountNumber(accountNumber:any){
    let headers = new HttpHeaders({'accountNumber': accountNumber + ''})
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_STANDING_INSTRUCTIONS + ERP_TRANSACTION_CONSTANTS.GET_ALL_BY_ACCOUNT_NUMBER);
  }

  addSbStandingInstructions(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_STANDING_INSTRUCTIONS + ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllSbStandingInstructions(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_STANDING_INSTRUCTIONS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSbStandingInstructionsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_STANDING_INSTRUCTIONS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSbStandingInstructions(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_STANDING_INSTRUCTIONS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
