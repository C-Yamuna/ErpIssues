import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SavingsBankKycService {

  constructor(private commonHttpService:CommonHttpService)  { }

  updateSbKyc(object:any){
    return this.commonHttpService.put(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.SB_KYC_DETAILS + Configuration.UPDATE);
  }

  addSbKyc(object:any){
    return this.commonHttpService.post(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.SB_KYC_DETAILS+ Configuration.ADD);
  }

  getAllSbKyc(){
    return this.commonHttpService.getAll(Configuration.DEMANDDEPOSITS + Configuration.SB_KYC_DETAILS + Configuration.GET_ALL);
  }

  getSbKyc(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.DEMANDDEPOSITS + Configuration.SB_KYC_DETAILS + Configuration.GET);
  }

  deleteSbKyc(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.DEMANDDEPOSITS + Configuration.SB_KYC_DETAILS + Configuration.DELETE);
  }
  getSbKycBySbAccId(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.DEMANDDEPOSITS + Configuration.SB_KYC_DETAILS + Configuration.SB_KYC_DETAILS_BY_SB_ID);
  }
  getAllKycTypes(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.KYC_DOC_TYPE + Configuration.GET_ALL);
  }
  getMemberKycBySbKyc(admisionNumber: any){
    let headers = new HttpHeaders({ 'admissionNumber': admisionNumber + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_KYC + ERP_TRANSACTION_CONSTANTS.GET_KYC_BY_ADMISSIONnuMBER);
  }
  
}
