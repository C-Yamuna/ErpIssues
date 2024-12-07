import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class ChargesTypesService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateChargesTypes(object:any){
    return this.commonHttpService.put(object, Headers, Configuration.LOANS + Configuration.CHARGES_TYPES + Configuration.UPDATE);
  }

  addChargesTypes(object:any){
    return this.commonHttpService.post(object, Headers, Configuration.LOANS + Configuration.CHARGES_TYPES+ Configuration.ADD);
  }

  getAllChargesTypes(){
    return this.commonHttpService.getAll(Configuration.LOANS + Configuration.CHARGES_TYPES + Configuration.GET_ALL);
  }

  getChargesTypesById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.LOANS + Configuration.CHARGES_TYPES + Configuration.GET);
  }

  deleteChargesTypes(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.LOANS + Configuration.CHARGES_TYPES + Configuration.DELETE);
  }
}
