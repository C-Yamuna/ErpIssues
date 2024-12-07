import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class SubDistrictService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSubDistrict(subdistrictModel:any){
    return this.commonHttpService.put(subdistrictModel, Headers, Configuration.COMMON_MASTER + Configuration.SUB_DISTRICT + Configuration.UPDATE);
  }

  addSubDistrict(subdistrictModel:any){
    return this.commonHttpService.post(subdistrictModel, Headers, Configuration.COMMON_MASTER + Configuration.SUB_DISTRICT+ Configuration.ADD);
  }
  
  getSubDistrictByDistrictId(districtId: any){
    let headers = new HttpHeaders({ 'districtId': districtId + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.SUB_DISTRICT + Configuration.GET_SUB_DISTRICTS_BY_DISTRICT_ID);
  }

  getAllSubDistrict(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.SUB_DISTRICT + Configuration.GET_ALL);
  }

  getSubDistrictById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.SUB_DISTRICT + Configuration.GET);
  }

  deleteSubDistrict(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.COMMON_MASTER + Configuration.SUB_DISTRICT + Configuration.DELETE);
  }
}
