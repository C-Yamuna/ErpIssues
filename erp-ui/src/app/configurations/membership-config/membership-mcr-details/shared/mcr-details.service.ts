import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class McrDetailsService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateMcrDetails(object:any){
    return this.commonHttpService.put(object, Headers, Configuration.MEMBERSHIP + Configuration.MCR_DETAILS + Configuration.UPDATE);
  }

  addMcrDetails(object:any){
    return this.commonHttpService.post(object, Headers, Configuration.MEMBERSHIP + Configuration.MCR_DETAILS+ Configuration.ADD);
  }

  getAllMcrDetails(){
    return this.commonHttpService.getAll(Configuration.MEMBERSHIP + Configuration.MCR_DETAILS + Configuration.GET_ALL);
  }

  getMcrDetailsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.MEMBERSHIP + Configuration.MCR_DETAILS + Configuration.GET);
  }

  deleteMcrDetails(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.MEMBERSHIP + Configuration.MCR_DETAILS + Configuration.DELETE);
  }
}
