import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class PacsDetailsService {

  constructor(private commonHttpService:CommonHttpService) { }

  updatePacsDetails(pacsdetailsModel:any){
    return this.commonHttpService.put(pacsdetailsModel, Headers, Configuration.COMMON_MASTER + Configuration.PACS_DETAILS + Configuration.UPDATE);
  }

  addPacsDetails(pacsdetailsModel:any){
    return this.commonHttpService.post(pacsdetailsModel, Headers, Configuration.COMMON_MASTER + Configuration.PACS_DETAILS+ Configuration.ADD);
  }

  

  getAllPacsDetails(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.PACS_DETAILS + Configuration.GET_ALL);
  }

  getPacsDetailsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.PACS_DETAILS + Configuration.GET);
  }

  deletePacsDetails(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.COMMON_MASTER + Configuration.PACS_DETAILS + Configuration.DELETE);
  }
}
