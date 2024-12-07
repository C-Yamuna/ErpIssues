import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class DccbService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateDccb(groupTypesModel:any){
    return this.commonHttpService.put(groupTypesModel, Headers, Configuration.COMMON_MASTER + Configuration.DCCB + Configuration.UPDATE);
  }

  addDccb(groupTypesModel:any){
    return this.commonHttpService.post(groupTypesModel, Headers, Configuration.COMMON_MASTER + Configuration.DCCB+ Configuration.ADD);
  }

  getAllDccb(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.DCCB + Configuration.GET_ALL);
  }

  getDccbById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.DCCB + Configuration.GET);
  }

  deleteDccb(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.COMMON_MASTER + Configuration.DCCB + Configuration.DELETE);
  }
}
