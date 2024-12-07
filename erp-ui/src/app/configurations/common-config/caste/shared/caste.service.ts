import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class CasteService {

  constructor(private commonHttpService:CommonHttpService) { }

  Updatecaste(casteModel:any){
    return this.commonHttpService.put(casteModel, Headers, Configuration.COMMON_MASTER + Configuration.CASTE + Configuration.UPDATE);
  }

  addCaste(casteModel:any){
    return this.commonHttpService.post(casteModel, Headers, Configuration.COMMON_MASTER + Configuration.CASTE+ Configuration.ADD);
  }

  getAllCaste(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.CASTE + Configuration.GET_ALL);
  }

  getCasteById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.CASTE + Configuration.GET);
  }

  deleteCaste(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.COMMON_MASTER + Configuration.CASTE + Configuration.DELETE);
  }
}