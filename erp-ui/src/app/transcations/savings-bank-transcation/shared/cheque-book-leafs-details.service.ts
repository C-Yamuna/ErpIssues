import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChequeBookLeafsDetailsService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateChequeBookLeafsDetails(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.CHEQUE_BOOK_LEAFS_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addChequeBookLeafsDetails(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.CHEQUE_BOOK_LEAFS_DETAILS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllChequeBookLeafsDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.CHEQUE_BOOK_LEAFS_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getChequeBookLeafsDetailsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.CHEQUE_BOOK_LEAFS_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteChequeBookLeafsDetails(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.CHEQUE_BOOK_LEAFS_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
