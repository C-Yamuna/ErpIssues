import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateDistrict(districtModel:any){
    return this.commonHttpService.put(districtModel, Headers, Configuration.COMMON_MASTER + Configuration.DISTRICT + Configuration.UPDATE);
  }

  addDistrict(districtModel:any){
    return this.commonHttpService.post(districtModel, Headers, Configuration.COMMON_MASTER + Configuration.DISTRICT+ Configuration.ADD);
  }

  getDistrictByStateId(stateId: any){
    let headers = new HttpHeaders({ 'stateId': stateId + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.DISTRICT + Configuration.GET_DISTRICT_BY_STATE_ID);
  }

  getAllDistricts(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.DISTRICT + Configuration.GET_ALL);
  }

  getDistrictById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.DISTRICT + Configuration.GET);
  }

  deleteDistrict(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.COMMON_MASTER + Configuration.DISTRICT + Configuration.DELETE);
  }

  
}