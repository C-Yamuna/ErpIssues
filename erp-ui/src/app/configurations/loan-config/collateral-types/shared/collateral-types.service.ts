import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class CollateralTypesService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateCollateralTypes(object:any){
    return this.commonHttpService.put(object, Headers, Configuration.LOANS + Configuration.COLLATERAL_TYPES + Configuration.UPDATE);
  }

  addCollateralTypes(object:any){
    return this.commonHttpService.post(object, Headers, Configuration.LOANS + Configuration.COLLATERAL_TYPES+ Configuration.ADD);
  }

  getAllCollateralTypes(){
    return this.commonHttpService.getAll(Configuration.LOANS + Configuration.COLLATERAL_TYPES + Configuration.GET_ALL);
  }

  getCollateralTypesById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.LOANS + Configuration.COLLATERAL_TYPES + Configuration.GET);
  }

  deleteCollateralTypes(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.LOANS + Configuration.COLLATERAL_TYPES + Configuration.DELETE);
  }
}
