import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class SbSettingService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSettings(object:any){
    return this.commonHttpService.put(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.SETTINGS + Configuration.UPDATE);
  }

  addSettings(object:any){
    return this.commonHttpService.post(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.SETTINGS+ Configuration.ADD);
  }

  getAllSettings(){
    return this.commonHttpService.getAll(Configuration.DEMANDDEPOSITS + Configuration.SETTINGS + Configuration.GET_ALL);
  }

  getSettings(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.DEMANDDEPOSITS + Configuration.SETTINGS + Configuration.GET);
  }

  deleteSettings(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.DEMANDDEPOSITS + Configuration.SETTINGS + Configuration.DELETE);
  }
}
