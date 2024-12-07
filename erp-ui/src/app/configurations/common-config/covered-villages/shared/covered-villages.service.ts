import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class CoveredVillagesService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateCoveredVillages(coverVillagesModel:any){
    return this.commonHttpService.put(coverVillagesModel, Headers, Configuration.COMMON_MASTER + Configuration.COVERED_VILLAGES + Configuration.UPDATE);
  }

  addCoveredVillages(coverVillagesModel:any){
    return this.commonHttpService.post(coverVillagesModel, Headers, Configuration.COMMON_MASTER + Configuration.COVERED_VILLAGES+ Configuration.ADD);
  }

  getAllCoveredVillagesByPacId(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.COVERED_VILLAGES + Configuration.GET_ALL_COVERED_VILLAGES_BY_PAC_ID);
  }

  getAllCoveredVillages(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.COVERED_VILLAGES + Configuration.GET_ALL);
  }

  getCoveredVillagesById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.COVERED_VILLAGES + Configuration.GET);
  }

  deleteCoveredVillages(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.COMMON_MASTER + Configuration.COVERED_VILLAGES + Configuration.DELETE);
  }
}
