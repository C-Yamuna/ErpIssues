import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class InsurerDetailsService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateInsurerDetails(insurerdetailsModel:any){
    return this.commonHttpService.put(insurerdetailsModel, Headers, Configuration.LOANS + Configuration.INSURENCE_VENDOR_DETAILS + Configuration.UPDATE);
  }

  addInsurerDetails(insurerdetailsModel:any){
    return this.commonHttpService.post(insurerdetailsModel, Headers, Configuration.LOANS + Configuration.INSURENCE_VENDOR_DETAILS+ Configuration.ADD);
  }

  getAllInsurerDetails(){
    return this.commonHttpService.getAll(Configuration.LOANS + Configuration.INSURENCE_VENDOR_DETAILS + Configuration.GET_ALL);
  }

  getInsurerDetailsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.LOANS + Configuration.INSURENCE_VENDOR_DETAILS + Configuration.GET);
  }

  deleteInsurerDetails(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.LOANS + Configuration.INSURENCE_VENDOR_DETAILS + Configuration.DELETE);
  }
}
