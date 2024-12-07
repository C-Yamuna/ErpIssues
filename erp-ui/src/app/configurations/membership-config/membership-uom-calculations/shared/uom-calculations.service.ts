import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class UomCalculationsService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateUomCalculations(uomCalculationsModel:any){
    return this.commonHttpService.put(uomCalculationsModel, Headers, Configuration.MEMBERSHIP + Configuration.UOM_CALCULATION + Configuration.UPDATE);
  }

  addUomCalculations(uomCalculationsModel:any){
    return this.commonHttpService.post(uomCalculationsModel, Headers, Configuration.MEMBERSHIP + Configuration.UOM_CALCULATION+ Configuration.ADD);
  }

  getAllUomCalculations(){
    return this.commonHttpService.getAll(Configuration.MEMBERSHIP + Configuration.UOM_CALCULATION + Configuration.GET_ALL);
  }

  getUomCalculationsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.MEMBERSHIP + Configuration.UOM_CALCULATION + Configuration.GET);
  }

  deleteUomCalculations(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.MEMBERSHIP + Configuration.UOM_CALCULATION + Configuration.DELETE);
  }
}
