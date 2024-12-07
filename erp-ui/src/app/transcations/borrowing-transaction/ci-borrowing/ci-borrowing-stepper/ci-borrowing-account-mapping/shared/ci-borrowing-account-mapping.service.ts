import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class CiBorrowingAccountMappingService {

  constructor(private commonHttpService:CommonHttpService) { }
  updateCiBorrowingAccountMapping(ciborrowingsModel:any){
    return this.commonHttpService.put(ciborrowingsModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_BORROWING_ACCOUNT_MAPPED_LOANS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addCiBorrowingAccountMapping(ciborrowingsModel:any){
    return this.commonHttpService.post(ciborrowingsModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_BORROWING_ACCOUNT_MAPPED_LOANS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllCiBorrowingAccountMapping(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_BORROWING_ACCOUNT_MAPPED_LOANS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getCiBorrowingAccountMappingById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_BORROWING_ACCOUNT_MAPPED_LOANS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteCiAccountDetails(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_BORROWING_ACCOUNT_MAPPED_LOANS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getBorrowingAccountMappedLoansListByPacsIdAndBranchId(id: any , pacsId:any){
    let headers = new HttpHeaders({ 'id': id + '','pacsId': pacsId + '' })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_BORROWING_ACCOUNT_MAPPED_LOANS + ERP_TRANSACTION_CONSTANTS.GET_BORROWING_ACCOUNT_MAPPED_LOANS_LIST_BY_PACSID_AND_BRANCHID);
  }
  getBorrowingAccountMappedLoansListByBorrowingAccountId(borrowingAccountId: any ){
    let headers = new HttpHeaders({ 'borrowingAccountId': borrowingAccountId + '' })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_BORROWING_ACCOUNT_MAPPED_LOANS + ERP_TRANSACTION_CONSTANTS.GET_BORROWING_ACCOUNT_MAPPED_LOANS_LIST_BY_BORROWING_ACCOUNTID);
  }
  addCiBorrowingAccountMappinglist(accountMappedDTOList:any){
    return this.commonHttpService.post(accountMappedDTOList, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.CI_BORROWING_ACCOUNT_MAPPED_LOANS+ ERP_TRANSACTION_CONSTANTS.ADD_BORROWING_MAPPING_LIST);
  }
  getAllDisbursementPendingLoans(pacsId: any, branchId: any){
    let headers = new HttpHeaders({ 'pacsId': pacsId + '', 'branchId': branchId + ''})
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.CI_LOAN_APPLICATION + ERP_TRANSACTION_CONSTANTS.GET_ALL_DISBURSEMENT_PENDING_LOANS);
  }
}
