import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class DenominationTypesService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateDenomination(denominationModel:any){
    return this.commonHttpService.put(denominationModel, Headers, Configuration.COMMON_MASTER + Configuration.DENOMINATION_TYPE + Configuration.UPDATE);
  }

  addDenomination(denominationModel:any){
    return this.commonHttpService.post(denominationModel, Headers, Configuration.COMMON_MASTER + Configuration.DENOMINATION_TYPE+ Configuration.ADD);
  }

  getAllDenomination(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.DENOMINATION_TYPE + Configuration.GET_ALL);
  }

  getDenominationById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.DENOMINATION_TYPE + Configuration.GET);
  }

  deleteDenomination(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.COMMON_MASTER + Configuration.DENOMINATION_TYPE + Configuration.DELETE);
  }
}
