import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { SiBorrowingAccountMapping } from './si-borrowing-account-mapping.model';

@Injectable({
  providedIn: 'root'
})
export class SiBorrowingAccountMappingService {

  constructor(private commonHttpService:CommonHttpService) { }
  updateSiBorrowingAccountMapping(SiBorrowingAccountMappingModel:any){
    return this.commonHttpService.put(SiBorrowingAccountMappingModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_ACCOUNT_MAPPED_LOANS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSiBorrowingAccountMapping(SiBorrowingAccountMappingModel:any){
    return this.commonHttpService.post(SiBorrowingAccountMappingModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_ACCOUNT_MAPPED_LOANS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllSiBorrowingAccountMapping(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_ACCOUNT_MAPPED_LOANS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSiBorrowingAccountMappingById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_ACCOUNT_MAPPED_LOANS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSiBorrowingAccountMapping(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_ACCOUNT_MAPPED_LOANS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getPreviewDataBySiBorrowingAccountId(borrowingAccountId: any){
    let headers = new HttpHeaders({ 'borrowingAccountId': borrowingAccountId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_ACCOUNT_MAPPED_LOANS + ERP_TRANSACTION_CONSTANTS.GET_PREVIEW_DATA_BY_BORROWING_ACCOUNTID);
  }
  
  
  getSiBorrowingAccountMappedLoansListByPacsIdAndBranchId(pacsId: any, id: any){
    let headers = new HttpHeaders({ 'pacsId': pacsId + '', 'id': id + ''})
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_ACCOUNT_MAPPED_LOANS + ERP_TRANSACTION_CONSTANTS.GET_SI_BORROWING_ACCOUNT_MAPPED_LOANS_LIST_BY_PACSID_AND_BRANCHID);
  }
  getSiBorrowingAccountMappedLoansListByBorrowingAccountId(borrowingAccountId: any){
    let headers = new HttpHeaders({ 'borrowingAccountId': borrowingAccountId + ''})
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_ACCOUNT_MAPPED_LOANS + ERP_TRANSACTION_CONSTANTS.GET_SI_BORROWING_ACCOUNT_MAPPED_LOANS_LIST_BY_BORROWING_ACCOUNTID);
  }

  getAllDisbursementPendingLoans(pacsId: any, branchId: any){
    let headers = new HttpHeaders({ 'pacsId': pacsId + '', 'branchId': branchId + ''})
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.SI_LOAN_APPLICATION + ERP_TRANSACTION_CONSTANTS.GET_ALL_DISBURSEMENT_PENDING_LOANS);
  }
  addSiBorrowingAccountMappinglist(accountMappedDTOList:any){
    return this.commonHttpService.post(accountMappedDTOList, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_ACCOUNT_MAPPED_LOANS+ ERP_TRANSACTION_CONSTANTS.ADD_BORROWING_MAPPING_LIST);
  }
 
}
