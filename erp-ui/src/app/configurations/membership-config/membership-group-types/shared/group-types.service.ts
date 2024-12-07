import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class GroupTypesService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateGroupTypes(groupTypesModel:any){
    return this.commonHttpService.put(groupTypesModel, Headers, Configuration.MEMBERSHIP + Configuration.GROUP_TYPES + Configuration.UPDATE);
  }

  addGroupTypes(groupTypesModel:any){
    return this.commonHttpService.post(groupTypesModel, Headers, Configuration.MEMBERSHIP + Configuration.GROUP_TYPES+ Configuration.ADD);
  }

  getAllGroupTypes(){
    return this.commonHttpService.getAll(Configuration.MEMBERSHIP + Configuration.GROUP_TYPES + Configuration.GET_ALL);
  }

  getGroupTypesById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.MEMBERSHIP + Configuration.GROUP_TYPES + Configuration.GET);
  }

  deleteGroupTypes(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.MEMBERSHIP + Configuration.GROUP_TYPES + Configuration.DELETE);
  }
}
