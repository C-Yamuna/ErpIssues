import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateState(stateModel:any){
    return this.commonHttpService.put(stateModel, Headers, Configuration.COMMON_MASTER + Configuration.STATE + Configuration.UPDATE);
  }

  addState(stateModel:any){
    return this.commonHttpService.post(stateModel, Headers, Configuration.COMMON_MASTER + Configuration.STATE+ Configuration.ADD);
  }

  getStateByCountryId(countryId: any){
    let headers = new HttpHeaders({ 'countryId': countryId + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.STATE + Configuration.GET_STATE_BY_COUNTRY_ID);
  }

  getAllStates(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.STATE + Configuration.GET_ALL);
  }

  getStateById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.STATE + Configuration.GET);
  }

  deleteState(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.COMMON_MASTER + Configuration.STATE + Configuration.DELETE);
  }
  getAllcountry(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.COUNTRY + Configuration.GET_ALL);
  }
}
