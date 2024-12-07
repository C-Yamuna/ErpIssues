import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstitutionPromoterDetailsService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateInsititutionPromoterDetails(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.INSTITUTION_PROMOTER_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addInsititutionPromoterDetails(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.INSTITUTION_PROMOTER_DETAILS+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getInsititutionPromoterDetailsByInstitutionIdAndPacsId(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.INSTITUTION_PROMOTER_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_INSTITUTION_PROMOTER_DETAILS_BY_INSTITUTION_ID_AND_PACSID);
  }
  
  getAllInsititutionPromoterDetails(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.INSTITUTION_PROMOTER_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getInsititutionPromoterDetailsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.INSTITUTION_PROMOTER_DETAILS + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteInsititutionPromoterDetails(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.INSTITUTION_PROMOTER_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
