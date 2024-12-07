import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class ScaleOfFinanceConfigsService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateScaleOfFinanceConfigs(object:any){
    return this.commonHttpService.put(object, Headers, Configuration.LOANS + Configuration.SCALE_OF_FINANCE_CONFIGS + Configuration.UPDATE);
  }

  addScaleOfFinanceConfigs(object:any){
    return this.commonHttpService.post(object, Headers, Configuration.LOANS + Configuration.SCALE_OF_FINANCE_CONFIGS+ Configuration.ADD);
  }

  getAllScaleOfFinanceConfigs(){
    return this.commonHttpService.getAll(Configuration.LOANS + Configuration.SCALE_OF_FINANCE_CONFIGS + Configuration.GET_ALL);
  }

  getScaleOfFinanceConfigsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.LOANS + Configuration.SCALE_OF_FINANCE_CONFIGS + Configuration.GET);
  }

  deleteScaleOfFinanceConfigs(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.LOANS + Configuration.SCALE_OF_FINANCE_CONFIGS + Configuration.DELETE);
  }
}
