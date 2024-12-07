import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class CiLoanApplicationsService {
  constructor(private commonHttpService: CommonHttpService) { }

  updateCiLoanApplications(loansModel: any) {
    return this.commonHttpService.put(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.CI_LOAN_APPLICATIONS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addCiLoanApplications(loansModel: any) {
    return this.commonHttpService.post(loansModel,Headers, ERP_TRANSACTION_CONSTANTS.LOANS+ ERP_TRANSACTION_CONSTANTS.CI_LOAN_APPLICATIONS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getCiLoanApplicationsById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_LOAN_APPLICATIONS + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllCiLoanApplications(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_LOAN_APPLICATIONS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteCiLoanApplications(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_LOAN_APPLICATIONS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getLoanApplicationDetailsByLoanApplicationId(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_LOAN_APPLICATIONS + ERP_TRANSACTION_CONSTANTS.GET_LOAN_APPLICATION_DETAILS_BY_LOAN_APPLICATION_ID);
  }
  getCiLoanApplicationDetailsByPacsIdAndBranchId(pacsId: any,branchId: any){
    let headers = new HttpHeaders({ 'pacsId': pacsId + '', 'branchId': branchId + '' })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_LOAN_APPLICATIONS + ERP_TRANSACTION_CONSTANTS.GET_CI_LOAN_APPLICATION_DETAILS_BY_PACS_ID_AND_BRANCH_ID);
  }
}
