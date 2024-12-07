import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class SbFormTypeService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSbFormType(object:any){
    return this.commonHttpService.put(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.SB_FORM_TYPES + Configuration.UPDATE);
  }

  addSbFormType(object:any){
    return this.commonHttpService.post(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.SB_FORM_TYPES+ Configuration.ADD);
  }

  getAllSbFormType(){
    return this.commonHttpService.getAll(Configuration.DEMANDDEPOSITS + Configuration.SB_FORM_TYPES + Configuration.GET_ALL);
  }

  getSbFormTypeById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.DEMANDDEPOSITS + Configuration.SB_FORM_TYPES + Configuration.GET);
  }

  deleteSbFormType(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.DEMANDDEPOSITS + Configuration.SB_FORM_TYPES + Configuration.DELETE);
  }
}
