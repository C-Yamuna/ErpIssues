import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class VoterConfigService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateVoterConfig(voterconfigModel:any){
    return this.commonHttpService.put(voterconfigModel, Headers, Configuration.MEMBERSHIP + Configuration.VOTERS_CONFIG + Configuration.UPDATE);
  }

  addVoterConfig(voterconfigModel:any){
    return this.commonHttpService.post(voterconfigModel, Headers, Configuration.MEMBERSHIP + Configuration.VOTERS_CONFIG+ Configuration.ADD);
  }

  getAllVoterConfig(){
    return this.commonHttpService.getAll(Configuration.MEMBERSHIP + Configuration.VOTERS_CONFIG + Configuration.GET_ALL);
  }

  getVoterConfigById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.MEMBERSHIP + Configuration.VOTERS_CONFIG + Configuration.GET);
  }

  deleteVoterConfig(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.MEMBERSHIP + Configuration.VOTERS_CONFIG + Configuration.DELETE);
  }
}
