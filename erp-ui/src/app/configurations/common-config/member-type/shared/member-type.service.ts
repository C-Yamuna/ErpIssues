import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class MemberTypeService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateMemberTypes(memberTypesModel:any){
    return this.commonHttpService.put(memberTypesModel, Headers, Configuration.COMMON_MASTER + Configuration.MEMBER_TYPES + Configuration.UPDATE);
  }

  addMemberTypes(memberTypesModel:any){
    return this.commonHttpService.post(memberTypesModel, Headers, Configuration.COMMON_MASTER + Configuration.MEMBER_TYPES+ Configuration.ADD);
  }

  getAllMemberTypes(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.MEMBER_TYPES + Configuration.GET_ALL);
  }

  getMemberTypesById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.MEMBER_TYPES + Configuration.GET);
  }

  deleteMemberTypes(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.COMMON_MASTER + Configuration.MEMBER_TYPES + Configuration.DELETE);
  }
}
