import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { Configuration } from '../../configurations-constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LockerConfigService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateLockerConfig(lockerconfigModel:any){
    return this.commonHttpService.put(lockerconfigModel, Headers, Configuration.LOCKERS + Configuration.LOCKER_CONFIGS + Configuration.UPDATE);
  }
  addLockerConfig(lockerconfigModel:any){
    return this.commonHttpService.post(lockerconfigModel, Headers, Configuration.LOCKERS + Configuration.LOCKER_CONFIGS+ Configuration.ADD);
  }

  getAllLockerConfig(){
    return this.commonHttpService.getAll(Configuration.LOCKERS + Configuration.LOCKER_CONFIGS + Configuration.GET_ALL);
  }

  getLockerConfigById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.LOCKERS + Configuration.LOCKER_CONFIGS + Configuration.GET);
  }

  deleteLockerConfig(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.LOCKERS + Configuration.LOCKER_CONFIGS + Configuration.DELETE);
  }
}
