import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class QualificationService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateQualification(qualificationModel:any){
    return this.commonHttpService.put(qualificationModel, Headers, Configuration.COMMON_MASTER + Configuration.QUALIFICATION + Configuration.UPDATE);
  }

  addQualification(qualificationModel:any){
    return this.commonHttpService.post(qualificationModel, Headers, Configuration.COMMON_MASTER + Configuration.QUALIFICATION+ Configuration.ADD);
  }

  getAllQualification(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.QUALIFICATION + Configuration.GET_ALL);
  }

  getQualificationById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.QUALIFICATION + Configuration.GET);
  }

  deleteQualification(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.COMMON_MASTER + Configuration.QUALIFICATION + Configuration.DELETE);
  }
}
