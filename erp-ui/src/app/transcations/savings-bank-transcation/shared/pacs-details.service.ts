import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PacsDetailsService {

  constructor(private commonHttpService:CommonHttpService) { }

  updatePacsDetails(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.PACS_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addPacsDetails(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.PACS_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllPacsDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.PACS_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getPacsDetailsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.PACS_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deletePacsDetails(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.PACS_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
