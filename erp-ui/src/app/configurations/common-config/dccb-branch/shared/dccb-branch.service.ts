import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class DccbBranchService {
  constructor(private commonHttpService:CommonHttpService) { }

  updateDccbBranch(groupTypesModel:any){
    return this.commonHttpService.put(groupTypesModel, Headers, Configuration.COMMON_MASTER + Configuration.DCCB_BRANCH + Configuration.UPDATE);
  }

  addDccbBranch(groupTypesModel:any){
    return this.commonHttpService.post(groupTypesModel, Headers, Configuration.COMMON_MASTER + Configuration.DCCB_BRANCH+ Configuration.ADD);
  }

  getAllDccbBranch(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.DCCB_BRANCH + Configuration.GET_ALL);
  }

  getDccbBranchById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.DCCB_BRANCH + Configuration.GET);
  }

  deleteDccbBranch(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.COMMON_MASTER + Configuration.DCCB_BRANCH + Configuration.DELETE);
  }
}
