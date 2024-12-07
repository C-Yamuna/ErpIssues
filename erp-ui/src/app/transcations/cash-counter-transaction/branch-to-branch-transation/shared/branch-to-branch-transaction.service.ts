import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class BranchToBranchTransactionService {

  constructor(private commonHttpService:CommonHttpService) { }

  updatBranchToBranchTransaction(branchtobranchtransactionModel:any){
    return this.commonHttpService.put(branchtobranchtransactionModel, Headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.BRANCH_TO_BRANCH_TRANSACTION + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addBranchToBranchTransaction(branchtobranchtransactionModel:any){
    return this.commonHttpService.post(branchtobranchtransactionModel, Headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.BRANCH_TO_BRANCH_TRANSACTION+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllBranchToBranchTransaction(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.BRANCH_TO_BRANCH_TRANSACTION + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getBranchToBranchTransactionById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.BRANCH_TO_BRANCH_TRANSACTION + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteBranchToBranchTransaction(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.BRANCH_TO_BRANCH_TRANSACTION + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
