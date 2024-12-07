import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class ApportionTypesService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateApportionTypes(apportiontypeModel:any){
    return this.commonHttpService.put(apportiontypeModel, Headers, Configuration.LOANS + Configuration.APPORTION_TYPES + Configuration.UPDATE);
  }

  addApportionTypes(apportiontypeModel:any){
    return this.commonHttpService.post(apportiontypeModel, Headers, Configuration.LOANS + Configuration.APPORTION_TYPES+ Configuration.ADD);
  }

  getAllApportionTypes(){
    return this.commonHttpService.getAll(Configuration.LOANS + Configuration.APPORTION_TYPES + Configuration.GET_ALL);
  }

  getApportionTypesById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.LOANS + Configuration.APPORTION_TYPES + Configuration.GET);
  }

  deleteApportionTypes(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.LOANS + Configuration.APPORTION_TYPES + Configuration.DELETE);
  }
}
