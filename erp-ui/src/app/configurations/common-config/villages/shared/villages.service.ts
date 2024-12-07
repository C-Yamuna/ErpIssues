import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class VillagesService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateVillage(villagesModel:any){
    return this.commonHttpService.put(villagesModel, Headers, Configuration.COMMON_MASTER + Configuration.VILLAGES + Configuration.UPDATE);
  }

  addVillage(villagesModel:any){
    return this.commonHttpService.post(villagesModel, Headers, Configuration.COMMON_MASTER + Configuration.VILLAGES+ Configuration.ADD);
  }
  
  getVillagesBySubDistrictId(subDistrictId: any){
    let headers = new HttpHeaders({ 'subDistrictId': subDistrictId + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.VILLAGES + Configuration.GET_VILLAGES_BY_SUB_DISTRICT_ID);
  }

  getAllVillages(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.VILLAGES + Configuration.GET_ALL);
  }

  getVillageById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.VILLAGES + Configuration.GET);
  }

  deleteVillage(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.COMMON_MASTER + Configuration.VILLAGES + Configuration.DELETE);
  }
}
