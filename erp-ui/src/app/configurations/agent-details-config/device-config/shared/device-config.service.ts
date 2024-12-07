import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceConfigService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateDeviceConfig(deviceConfigModel:any){
    return this.commonHttpService.put(deviceConfigModel, Headers, Configuration.AGENTDETAILS + Configuration.DEVICE_CONFIG + Configuration.UPDATE);
  }

  addDeviceConfig(deviceConfigModel:any){
    return this.commonHttpService.post(deviceConfigModel, Headers, Configuration.AGENTDETAILS + Configuration.DEVICE_CONFIG+ Configuration.ADD);
  }

  getAllDeviceConfig(){
    return this.commonHttpService.getAll(Configuration.AGENTDETAILS + Configuration.DEVICE_CONFIG + Configuration.GET_ALL);
  }

  getDeviceConfigById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.AGENTDETAILS + Configuration.DEVICE_CONFIG + Configuration.GET);
  }

  deleteDeviceConfig(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.AGENTDETAILS + Configuration.DEVICE_CONFIG + Configuration.DELETE);
  }
}
