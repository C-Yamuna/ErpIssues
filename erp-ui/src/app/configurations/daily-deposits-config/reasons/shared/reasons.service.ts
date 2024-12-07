import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class ReasonsService {
  constructor(private commonHttpService:CommonHttpService) { }

  updateReason(reasonModel:any){
    return this.commonHttpService.put(reasonModel, Headers, Configuration.DAILYDEPOSITS + Configuration.REASON + Configuration.UPDATE);
  }

  addReason(reasonModel:any){
    return this.commonHttpService.post(reasonModel, Headers, Configuration.DAILYDEPOSITS + Configuration.REASON+ Configuration.ADD);
  }

  getAllReason(){
    return this.commonHttpService.getAll(Configuration.DAILYDEPOSITS + Configuration.REASON + Configuration.GET_ALL);
  }

  getReasonById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.DAILYDEPOSITS + Configuration.REASON + Configuration.GET);
  }

  deleteReason(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.DAILYDEPOSITS + Configuration.REASON + Configuration.DELETE);
  }
}
