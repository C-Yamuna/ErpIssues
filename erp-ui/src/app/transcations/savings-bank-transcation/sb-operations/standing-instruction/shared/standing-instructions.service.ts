import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class StandingInstructionsService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSbStandarEdeInstructions(object:any){
    return this.commonHttpService.put(object, Headers, Configuration.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.STANDAERED_INSTRUCTION + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSbStandarEdeInstructions(object:any){
    return this.commonHttpService.post(object, Headers, Configuration.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.STANDAERED_INSTRUCTION+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllSbStandarEdeInstructions(){
    return this.commonHttpService.getAll(Configuration.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.STANDAERED_INSTRUCTION + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
 
  getSbStandarEdeInstructions(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.STANDAERED_INSTRUCTION + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSbStandarEdeInstructions(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.STANDAERED_INSTRUCTION + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  getAllDenominationTypes(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.DENOMINATION_TYPES + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSbStandaredeInstructionsByAccountNumber(accountNumber:any){
    let headers = new HttpHeaders({ 'accountNumber': accountNumber + '', })
    return this.commonHttpService.getById( headers, Configuration.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.STANDAERED_INSTRUCTION + ERP_TRANSACTION_CONSTANTS.GET_ALL_STANDAERED_INSTRUCTIONS_BY_ACCOUNT_NUMBER);
  }

  getServiceChargesConfigDetailsByProductIdAndServiceTypeId(productId :any){
    let headers = new HttpHeaders({  'productId': productId+''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_SERVICE_CHARGES_CONFIGURATION + ERP_TRANSACTION_CONSTANTS.GET_SB_SERVICE_CHARGES_CONFIG_DETAILS_BY_PRODUCT_ID);
  }
}
