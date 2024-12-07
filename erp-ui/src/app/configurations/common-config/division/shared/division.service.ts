import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateDivision(divisionModel:any){
    return this.commonHttpService.put(divisionModel, Headers, Configuration.COMMON_MASTER + Configuration.DIVISION + Configuration.UPDATE);
  }

  addDivision(divisionModel:any){
    return this.commonHttpService.post(divisionModel, Headers, Configuration.COMMON_MASTER + Configuration.DIVISION+ Configuration.ADD);
  }

  getAllDivision(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.DIVISION + Configuration.GET_ALL);
  }

  getDivisionById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.DIVISION + Configuration.GET);
  }

  deleteDivision(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.COMMON_MASTER + Configuration.DIVISION + Configuration.DELETE);
  }
}
