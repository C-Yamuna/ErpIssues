import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class SbProductDefinitionService {

  constructor(private commonHttpService:CommonHttpService) { }

  updatesbProductDefinition(sbproductdefinitionModel:any){
    return this.commonHttpService.put(sbproductdefinitionModel, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addsbProductDefinition(sbproductdefinitionModel:any){
    return this.commonHttpService.post(sbproductdefinitionModel, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.PRODUCT_DEFINITION+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllsbProductDefinition(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getsbProductDefinitionById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deletesbProductDefinition(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
  getAllActiveProductBasedOnPacsId  (pacsId: any){
    let headers = new HttpHeaders({ 'pacsId': pacsId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET_ALL_ACTIVE_PRODUCT_BASED_ON_PACS_ID);
  }
  
  getActiveProductBasedOnProductId(productId: any){
    let headers = new HttpHeaders({ 'productId': productId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET_ACTIVE_PRODUCT_BASED_ON_PRODUCT_ID);
  }
  getProductlistByPacsId  (pacsId: any){
    let headers = new HttpHeaders({ 'pacsId': pacsId + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET_PRODUCT_LIST_BY_PACSID);
  }

}
