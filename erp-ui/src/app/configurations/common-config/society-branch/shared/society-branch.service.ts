import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class SocietyBranchService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSocietyBranch(societybranchModel:any){
    return this.commonHttpService.put(societybranchModel, Headers, Configuration.COMMON_MASTER + Configuration.SOCIETY_BRANCHES + Configuration.UPDATE);
  }

  addSocietyBranch(societybranchModel:any){
    return this.commonHttpService.post(societybranchModel, Headers, Configuration.COMMON_MASTER + Configuration.SOCIETY_BRANCHES+ Configuration.ADD);
  }

  

  getAllSocietyBranch(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.SOCIETY_BRANCHES + Configuration.GET_ALL);
  }

  getSocietyBranchById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.SOCIETY_BRANCHES + Configuration.GET);
  }

  deleteSocietyBranch(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.COMMON_MASTER + Configuration.SOCIETY_BRANCHES + Configuration.DELETE);
  }
}
