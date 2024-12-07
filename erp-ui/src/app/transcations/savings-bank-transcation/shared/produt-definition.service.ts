import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutDefinitionService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateProductDefinition(object:any){
    return this.commonHttpService.put(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addProductDefinition(object:any){
    return this.commonHttpService.post(object, Headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllProductDefinition(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getProductDefinitionById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deleteProductDefinition(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
