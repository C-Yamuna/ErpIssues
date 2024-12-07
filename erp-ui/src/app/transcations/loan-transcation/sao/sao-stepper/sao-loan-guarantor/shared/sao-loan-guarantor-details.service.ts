import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class SaoLoanGuarantorDetailsService {
  constructor(private commonHttpService: CommonHttpService) { }

  updateSaoLoanGuarantorDetails(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SAO_LOAN_GUARANTOR_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addSaoLoanGuarantorDetails(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.SAO_LOAN_GUARANTOR_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getSaoLoanGuarantorDetailsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_GUARANTOR_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllSaoLoanGuarantorDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_GUARANTOR_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteSaoLoanGuarantorDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_GUARANTOR_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  saveSaoLoanGuarantorDetailsList(gurantorList: any){
    return this.commonHttpService.post( gurantorList, Headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_GUARANTOR_DETAILS+ ERP_TRANSACTION_CONSTANTS.SAVE_GURANTOR_LIST);
  }
  getSaoLoanGuarantorDetailsList(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_GUARANTOR_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_GURANTOR_DETAILS_BY_APP_ID);
  }
 
}
