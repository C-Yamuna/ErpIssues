import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class IncorporationTypesService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateIncorporationTypes(incorporationTypesModel:any){
    return this.commonHttpService.put(incorporationTypesModel, Headers, Configuration.MEMBERSHIP + Configuration.INCORPORATION_TYPES + Configuration.UPDATE);
  }

  addIncorporationTypes(incorporationTypesModel:any){
    return this.commonHttpService.post(incorporationTypesModel, Headers, Configuration.MEMBERSHIP + Configuration.INCORPORATION_TYPES+ Configuration.ADD);
  }

  getAllIncorporationTypes(){
    return this.commonHttpService.getAll(Configuration.MEMBERSHIP + Configuration.INCORPORATION_TYPES + Configuration.GET_ALL);
  }

  getIncorporationTypesById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.MEMBERSHIP + Configuration.INCORPORATION_TYPES + Configuration.GET);
  }

  deleteIncorporationTypes(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.MEMBERSHIP + Configuration.INCORPORATION_TYPES + Configuration.DELETE);
  }
}
