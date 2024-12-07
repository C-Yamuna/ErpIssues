import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceTypesService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateServiceTypes(servicetypesModel:any){
    return this.commonHttpService.put(servicetypesModel, Headers, Configuration.DEMANDDEPOSITS + Configuration.SERVICE_TYPES + Configuration.UPDATE);
  }

  addServiceTypes(servicetypesModel:any){
    return this.commonHttpService.post(servicetypesModel, Headers, Configuration.DEMANDDEPOSITS + Configuration.SERVICE_TYPES+ Configuration.ADD);
  }

  getAllServiceTypes(){
    return this.commonHttpService.getAll(Configuration.DEMANDDEPOSITS + Configuration.SERVICE_TYPES + Configuration.GET_ALL);
  }

  getServiceTypesById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.DEMANDDEPOSITS + Configuration.SERVICE_TYPES + Configuration.GET);
  }

  deleteServiceTypes(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.DEMANDDEPOSITS + Configuration.SERVICE_TYPES + Configuration.DELETE);
  }
}
