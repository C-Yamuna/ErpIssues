import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class FeeTypeService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateFeeType(feeTypesModel:any){
    return this.commonHttpService.put(feeTypesModel, Headers, Configuration.MEMBERSHIP + Configuration.FEE_TYPE + Configuration.UPDATE);
  }

  addFeeType(feeTypesModel:any){
    return this.commonHttpService.post(feeTypesModel, Headers, Configuration.MEMBERSHIP + Configuration.FEE_TYPE+ Configuration.ADD);
  }

  getAllFeeType(){
    return this.commonHttpService.getAll(Configuration.MEMBERSHIP + Configuration.FEE_TYPE + Configuration.GET_ALL);
  }

  getFeeTypeById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.MEMBERSHIP + Configuration.FEE_TYPE + Configuration.GET);
  }

  deleteFeeType(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.MEMBERSHIP + Configuration.FEE_TYPE + Configuration.DELETE);
  }
}
