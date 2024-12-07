import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateProductTypes(object:any){
    return this.commonHttpService.put(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.PRODUCT_TYPES + Configuration.UPDATE);
  }

  addProductTypes(object:any){
    return this.commonHttpService.post(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.PRODUCT_TYPES+ Configuration.ADD);
  }

  getAllProductTypes(){
    return this.commonHttpService.getAll(Configuration.DEMANDDEPOSITS + Configuration.PRODUCT_TYPES + Configuration.GET_ALL);
  }

  getProductTypes(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.DEMANDDEPOSITS + Configuration.PRODUCT_TYPES + Configuration.GET);
  }

  deleteProductTypes(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.DEMANDDEPOSITS + Configuration.PRODUCT_TYPES + Configuration.DELETE);
  }
}
