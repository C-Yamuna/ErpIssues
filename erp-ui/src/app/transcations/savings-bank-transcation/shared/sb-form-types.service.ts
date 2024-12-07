import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SbFormTypesService {
  
  constructor(private commonHttpService:CommonHttpService) { }

  updateSbFormTypes(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_FORM_TYPES + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addSbFormTypes(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_FORM_TYPES + ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllSbFormTypes(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_FORM_TYPES + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getSbFormTypesById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_FORM_TYPES + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteSbFormTypes(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_FORM_TYPES + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
