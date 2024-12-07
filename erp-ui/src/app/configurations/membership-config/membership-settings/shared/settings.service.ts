import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSettings(settingsModel:any){
    return this.commonHttpService.put(settingsModel, Headers, Configuration.MEMBERSHIP + Configuration.SETTINGS + Configuration.UPDATE);
  }

  addSettings(settingsModel:any){
    return this.commonHttpService.post(settingsModel, Headers, Configuration.MEMBERSHIP + Configuration.SETTINGS+ Configuration.ADD);
  }

  getAllSettings(){
    return this.commonHttpService.getAll(Configuration.MEMBERSHIP + Configuration.SETTINGS + Configuration.GET_ALL);
  }

  getSettingsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.MEMBERSHIP + Configuration.SETTINGS + Configuration.GET);
  }

  deleteSettings(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.MEMBERSHIP + Configuration.SETTINGS + Configuration.DELETE);
  }
}
