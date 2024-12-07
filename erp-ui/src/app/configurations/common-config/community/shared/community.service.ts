import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateCommunity(communityModel:any){
    return this.commonHttpService.put(communityModel, Headers, Configuration.COMMON_MASTER + Configuration.COMMUNITY + Configuration.UPDATE);
  }

  addCommunity(communityModel:any){
    return this.commonHttpService.post(communityModel, Headers, Configuration.COMMON_MASTER + Configuration.COMMUNITY+ Configuration.ADD);
  }

  getAllCommunity(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.COMMUNITY + Configuration.GET_ALL);
  }

  getCommunityById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.COMMUNITY + Configuration.GET);
  }

  deleteCommunity(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.COMMON_MASTER + Configuration.COMMUNITY + Configuration.DELETE);
  }
}
