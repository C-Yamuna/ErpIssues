import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class FdCumulativeCommunicationService {

  constructor(private commonHttpService:CommonHttpService) { }

  getstatesList(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.STATE + Configuration.GET_ALL);
  }

  getDistrictsByStateId(id : any){
    let headers = new HttpHeaders({ 'stateId': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.DISTRICT + Configuration.GET_DISTRICT_BY_STATE_ID);
  }

  getMandalsByDistrictId(id : any){
    let headers = new HttpHeaders({ 'districtId': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.SUB_DISTRICT + Configuration.GET_SUB_DISTRICTS_BY_DISTRICT_ID);
  }
  
  getvillagesByMandalId(id : any){
    let headers = new HttpHeaders({ 'subDistrictId': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.VILLAGES + Configuration.GET_VILLAGES_BY_SUB_DISTRICT_ID);
  }

  updateCommunication(fdNonCummCommunicationDto:any){
    return this.commonHttpService.put(fdNonCummCommunicationDto, Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMM_COMMUNICATION_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addCommunication(fdNonCummCommunicationDto:any){
    return this.commonHttpService.post(fdNonCummCommunicationDto, Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMM_COMMUNICATION_DETAILS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }
}
