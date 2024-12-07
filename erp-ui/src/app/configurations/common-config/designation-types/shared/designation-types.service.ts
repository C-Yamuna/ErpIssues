import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class DesignationTypesService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateDesignationTypes(designationTypesModel:any){
    return this.commonHttpService.put(designationTypesModel, Headers, Configuration.COMMON_MASTER + Configuration.DESIGNATION_TYPES + Configuration.UPDATE);
  }

  addDesignationTypes(designationTypesModel:any){
    return this.commonHttpService.post(designationTypesModel, Headers, Configuration.COMMON_MASTER + Configuration.DESIGNATION_TYPES+ Configuration.ADD);
  }

  getAllDesignationTypes(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.DESIGNATION_TYPES + Configuration.GET_ALL);
  }

  getDesignationTypesById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.DESIGNATION_TYPES + Configuration.GET);
  }

  deleteDesignationTypes(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.COMMON_MASTER + Configuration.DESIGNATION_TYPES + Configuration.DELETE);
  }
}
