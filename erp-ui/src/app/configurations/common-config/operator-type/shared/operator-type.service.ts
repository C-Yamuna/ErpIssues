import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class OperatorTypeService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateOperationTypes(operationTypesModel:any){
    return this.commonHttpService.put(operationTypesModel, Headers, Configuration.COMMON_MASTER + Configuration.OPERATION_TYPES + Configuration.UPDATE);
  }

  addOperationTypes(operationTypesModel:any){
    return this.commonHttpService.post(operationTypesModel, Headers, Configuration.COMMON_MASTER + Configuration.OPERATION_TYPES+ Configuration.ADD);
  }

  getAllOperationTypes(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.OPERATION_TYPES + Configuration.GET_ALL);
  }

  getOperationTypesById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.OPERATION_TYPES + Configuration.GET);
  }

  deleteOperationTypes(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.COMMON_MASTER + Configuration.OPERATION_TYPES + Configuration.DELETE);
  }
}
