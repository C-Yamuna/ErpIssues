import { Injectable } from '@angular/core';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StandingInstructionsPaymentService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateStandingInstructionsPayment(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.STANDING_INSTRUCTIONS_PAYMENTS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addStandingInstructionsPayment(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.STANDING_INSTRUCTIONS_PAYMENTS + ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllStandingInstructionsPayment(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.STANDING_INSTRUCTIONS_PAYMENTS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getTStandingInstructionsPaymentById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.STANDING_INSTRUCTIONS_PAYMENTS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteStandingInstructionsPayment(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.STANDING_INSTRUCTIONS_PAYMENTS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
