import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class FarmerTypesService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateFarmerTypes(farmertypeModel:any){
    return this.commonHttpService.put(farmertypeModel, Headers, Configuration.LOANS + Configuration.FARMER_CATEGORY + Configuration.UPDATE);
  }

  addFarmerTypes(farmertypeModel:any){
    return this.commonHttpService.post(farmertypeModel, Headers, Configuration.LOANS + Configuration.FARMER_CATEGORY+ Configuration.ADD);
  }

  getAllFarmerTypes(){
    return this.commonHttpService.getAll(Configuration.LOANS + Configuration.FARMER_CATEGORY + Configuration.GET_ALL);
  }

  getFarmerTypesById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.LOANS + Configuration.FARMER_CATEGORY + Configuration.GET);
  }

  deleteFarmerTypes(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.LOANS + Configuration.FARMER_CATEGORY + Configuration.DELETE);
  }
}