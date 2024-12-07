import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class WaterSourceTypesService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateWaterSourceTypes(watersourcetypeModel:any){
    return this.commonHttpService.put(watersourcetypeModel, Headers, Configuration.MEMBERSHIP + Configuration.WATER_SOURCE_TYPES + Configuration.UPDATE);
  }

  addWaterSourceTypes(watersourcetypeModel:any){
    return this.commonHttpService.post(watersourcetypeModel, Headers, Configuration.MEMBERSHIP + Configuration.WATER_SOURCE_TYPES+ Configuration.ADD);
  }

  getAllWaterSourceTypes(){
    return this.commonHttpService.getAll(Configuration.MEMBERSHIP + Configuration.WATER_SOURCE_TYPES + Configuration.GET_ALL);
  }

  getWaterSourceTypesById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.MEMBERSHIP + Configuration.WATER_SOURCE_TYPES + Configuration.GET);
  }

  deleteWaterSourceTypes(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.MEMBERSHIP + Configuration.WATER_SOURCE_TYPES + Configuration.DELETE);
  }
}
