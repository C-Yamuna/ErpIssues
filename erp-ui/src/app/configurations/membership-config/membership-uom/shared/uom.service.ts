import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class UomService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateUom(uomModel:any){
    return this.commonHttpService.put(uomModel, Headers, Configuration.MEMBERSHIP + Configuration.UOM + Configuration.UPDATE);
  }

  addUom(uomModel:any){
    return this.commonHttpService.post(uomModel, Headers, Configuration.MEMBERSHIP + Configuration.UOM+ Configuration.ADD);
  }

  getAllUom(){
    return this.commonHttpService.getAll(Configuration.MEMBERSHIP + Configuration.UOM + Configuration.GET_ALL);
  }

  getUomById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.MEMBERSHIP + Configuration.UOM + Configuration.GET);
  }

  deleteUom(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.MEMBERSHIP + Configuration.UOM + Configuration.DELETE);
  }
}
