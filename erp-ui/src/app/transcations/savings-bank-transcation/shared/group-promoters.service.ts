import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupPromotersService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateGroupPromoters(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.GROUP_PROMOTERS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addGroupPromoters(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.GROUP_PROMOTERS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getGroupPromotersByGroupId(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.GROUP_PROMOTERS + ERP_TRANSACTION_CONSTANTS.GET_GROUP_PROMOTERS_DETAILS_BY_GROUP_ID);
  }

  getAllGroupPromoters(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.GROUP_PROMOTERS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getGroupPromotersById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.GROUP_PROMOTERS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteGroupPromoters(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.GROUP_PROMOTERS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
