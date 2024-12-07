import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { stepperDataModel } from '../../fd-cumulative-application/shared/fd-cumulative-application.service';

@Injectable({
  providedIn: 'root'
})
export class FdCumulativeKycService {

  private organizationDetailsStepper = new BehaviorSubject<stepperDataModel>(null);
  public currentStep = this.organizationDetailsStepper.asObservable();

  public resetCurrentStep() {
    this.organizationDetailsStepper.next(null); // or initial value
  }
  constructor(private commonHttpService : CommonHttpService) { }
  changeData(data: stepperDataModel) {
    this.organizationDetailsStepper.next(data)
  }

  getAllKycTypes(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.KYC_DOC_TYPE + Configuration.GET_ALL);
  }

  getKycById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  updateKyc(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addKyc(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_KYC_DETAILS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  deleteKyc(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }

  getMemberKycByAddmissionNumber(admisionNumber: any){
    let headers = new HttpHeaders({ 'admissionNumber': admisionNumber + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_KYC_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_KYC_BY_ADMISSIONUMBER);
  }
  getfdKycByfdAccId(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_ACCOUNT_KYC + ERP_TRANSACTION_CONSTANTS.GET_KYC_DETAILS_BY_FD_CUMULATIVE_ACCOUNT_ID);
  }
  
}
