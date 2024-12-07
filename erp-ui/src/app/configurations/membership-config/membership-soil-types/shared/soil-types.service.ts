import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class SoilTypesService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSoilTypes(soilTypesModel:any){
    return this.commonHttpService.put(soilTypesModel, Headers, Configuration.MEMBERSHIP + Configuration.SOIL_TYPES + Configuration.UPDATE);
  }

  addSoilTypes(soilTypesModel:any){
    return this.commonHttpService.post(soilTypesModel, Headers, Configuration.MEMBERSHIP + Configuration.SOIL_TYPES+ Configuration.ADD);
  }

  getAllSoilTypes(){
    return this.commonHttpService.getAll(Configuration.MEMBERSHIP + Configuration.SOIL_TYPES + Configuration.GET_ALL);
  }

  getSoilTypesById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.MEMBERSHIP + Configuration.SOIL_TYPES + Configuration.GET);
  }

  deleteSoilTypes(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.MEMBERSHIP + Configuration.SOIL_TYPES + Configuration.DELETE);
  }
}
