import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MemInstitutionsService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateMemInstitutions(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.MEM_INSTITUTIONS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addMemInstitutions(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.MEM_INSTITUTIONS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllMemInstitutions(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.MEM_INSTITUTIONS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getMemInstitutionsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.MEM_INSTITUTIONS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteMemInstitutions(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.MEM_INSTITUTIONS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}