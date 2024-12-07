import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class IrrigationTypeService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateIrrigationType(irrigationTypesModel:any){
    return this.commonHttpService.put(irrigationTypesModel, Headers, Configuration.MEMBERSHIP + Configuration.IRRIGATION_TYPE + Configuration.UPDATE);
  }

  addIrrigationType(irrigationTypesModel:any){
    return this.commonHttpService.post(irrigationTypesModel, Headers, Configuration.MEMBERSHIP + Configuration.IRRIGATION_TYPE+ Configuration.ADD);
  }

  getAllIrrigationType(){
    return this.commonHttpService.getAll(Configuration.MEMBERSHIP + Configuration.IRRIGATION_TYPE + Configuration.GET_ALL);
  }

  getIrrigationTypeById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.MEMBERSHIP + Configuration.IRRIGATION_TYPE + Configuration.GET);
  }

  deleteIrrigationType(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.MEMBERSHIP + Configuration.IRRIGATION_TYPE + Configuration.DELETE);
  }
}
