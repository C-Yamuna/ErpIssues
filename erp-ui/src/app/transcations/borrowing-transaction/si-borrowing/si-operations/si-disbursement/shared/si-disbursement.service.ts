import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
@Injectable({
  providedIn: 'root'
})
export class SiDisbursementService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSiDisbursement(siborrowingsModel:any){
    return this.commonHttpService.put(siborrowingsModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_DISBURSMENT + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSiDisbursement(siborrowingsModel:any){
    return this.commonHttpService.post(siborrowingsModel, Headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_DISBURSMENT+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllSiDisbursement(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_DISBURSMENT + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSiDisbursementById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_DISBURSMENT + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSiDisbursement(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_DISBURSMENT + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getBySiDisbursementAccountId(borrowingAccountId: any){
    let headers = new HttpHeaders({ 'borrowingAccountId': borrowingAccountId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_DISBURSMENT + ERP_TRANSACTION_CONSTANTS.GET_BY_SI_BORROWING_ACCOUNT_ID);
  }
  
 
  getByPacsIdAndBranchId(pacsId: any, branchId: any){
    let headers = new HttpHeaders({ 'pacsId': pacsId + '', 'branchId': branchId + ''})
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.SI_BORROWING_DISBURSMENT + ERP_TRANSACTION_CONSTANTS.GET_BY_PACSID_AND_BRANCHID);
  }
}
