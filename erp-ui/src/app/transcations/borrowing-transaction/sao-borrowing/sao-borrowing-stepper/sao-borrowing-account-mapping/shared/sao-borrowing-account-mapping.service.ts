import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SaoBorrowingAccountMappingService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSaoBorrowingAccountMapping(saoBorrowingAccountMappingModel:any){
    return this.commonHttpService.put(saoBorrowingAccountMappingModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_BORROWING_ACCOUNT_MAPPED_LOANS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSaoBorrowingAccountMapping(saoBorrowingAccountMappingModel:any){
    return this.commonHttpService.post(saoBorrowingAccountMappingModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_BORROWING_ACCOUNT_MAPPED_LOANS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllSaoBorrowingAccountMapping(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_BORROWING_ACCOUNT_MAPPED_LOANS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSaoBorrowingAccountMappingById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_BORROWING_ACCOUNT_MAPPED_LOANS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSaoBorrowingAccountMapping(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_BORROWING_ACCOUNT_MAPPED_LOANS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getBorrowingAccountMappedLoansListByPacsIdAndBranchId(id: any , pacsId:any){
    let headers = new HttpHeaders({ 'id': id + '','pacsId': pacsId + '' })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_BORROWING_ACCOUNT_MAPPED_LOANS + ERP_TRANSACTION_CONSTANTS.GET_BORROWING_ACCOUNT_MAPPED_LOANS_LIST_BY_PACSID_AND_BRANCHID);
  }
  getBorrowingAccountMappedLoansListByBorrowingAccountId(borrowingAccountId: any ){
    let headers = new HttpHeaders({ 'borrowingAccountId': borrowingAccountId + '' })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_BORROWING_ACCOUNT_MAPPED_LOANS + ERP_TRANSACTION_CONSTANTS.GET_BORROWING_ACCOUNT_MAPPED_LOANS_LIST_BY_BORROWING_ACCOUNTID);
  }

  getAllDisbursementPendingLoans(pacsId: any, branchId: any){
    let headers = new HttpHeaders({ 'pacsId': pacsId + '', 'branchId': branchId + ''})
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SAO_LOAN_APPLICATION + ERP_TRANSACTION_CONSTANTS.GET_ALL_DISBURSEMENT_PENDING_LOANS);
  }
  addSaoBorrowingAccountMappinglist(accountMappedDTOList:any){
    return this.commonHttpService.post(accountMappedDTOList, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SAO_BORROWING_ACCOUNT_MAPPED_LOANS+ ERP_TRANSACTION_CONSTANTS.ADD_BORROWING_MAPPING_LIST);
  }
}
