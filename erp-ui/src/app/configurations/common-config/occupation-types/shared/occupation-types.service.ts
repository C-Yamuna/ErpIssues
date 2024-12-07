import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class OccupationTypesService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateOccupationTypes(occupationtypeModel:any){
    return this.commonHttpService.put(occupationtypeModel, Headers, Configuration.COMMON_MASTER + Configuration.OCCUPATION_TYPES + Configuration.UPDATE);
  }

  addOccupationTypes(occupationtypeModel:any){
    return this.commonHttpService.post(occupationtypeModel, Headers, Configuration.COMMON_MASTER + Configuration.OCCUPATION_TYPES+ Configuration.ADD);
  }

  getAllOccupationTypes(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.OCCUPATION_TYPES + Configuration.GET_ALL);
  }

  getOccupationTypesById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.OCCUPATION_TYPES + Configuration.GET);
  }

  deleteOccupationTypes(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.COMMON_MASTER + Configuration.OCCUPATION_TYPES + Configuration.DELETE);
  }
  
}
