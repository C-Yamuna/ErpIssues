import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class CommonCategoryService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateCommonCategory(commoncategoryModel:any){
    return this.commonHttpService.put(commoncategoryModel, Headers, Configuration.TERMDEPOSITS + Configuration.COMMON_CATEGORY + Configuration.UPDATE);
  }

  addCommonCategory(commoncategoryModel:any){
    return this.commonHttpService.post(commoncategoryModel, Headers, Configuration.TERMDEPOSITS + Configuration.COMMON_CATEGORY+ Configuration.ADD);
  }
  getAllCategoryWithCategoryStatus(){
    return this.commonHttpService.getAll(Configuration.TERMDEPOSITS + Configuration.COMMON_CATEGORY + Configuration.GET_ALL_CATEGORY_WITH_CATEGORY_STATUS);
  }

  getAllCommonCategory(){
    return this.commonHttpService.getAll(Configuration.TERMDEPOSITS + Configuration.COMMON_CATEGORY + Configuration.GET_ALL);
  }

  getCommonCategoryById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.TERMDEPOSITS + Configuration.COMMON_CATEGORY + Configuration.GET);
  }

  deleteCommonCategory(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.TERMDEPOSITS + Configuration.COMMON_CATEGORY + Configuration.DELETE);
  }

  updateCommonStatus(commonstatusModel:any){
    return this.commonHttpService.put(commonstatusModel, Headers, Configuration.TERMDEPOSITS + Configuration.COMMON_STATUS + Configuration.UPDATE);
  }

  addCommonStatus(commonstatusModel:any){
    return this.commonHttpService.post(commonstatusModel, Headers, Configuration.TERMDEPOSITS + Configuration.COMMON_STATUS+ Configuration.ADD);
  }
  getCommonStatusByCategoryId(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers,Configuration.TERMDEPOSITS + Configuration.COMMON_STATUS + Configuration.GET);
  
  }
  
  getAllCommonStatus(){
    return this.commonHttpService.getAll(Configuration.TERMDEPOSITS + Configuration.COMMON_STATUS + Configuration.GET_ALL);
  }

  getCommonStatusById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.TERMDEPOSITS + Configuration.COMMON_STATUS + Configuration.GET);
  }

  deleteCommonStatus(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.TERMDEPOSITS + Configuration.COMMON_STATUS + Configuration.DELETE);
  }

  getCommonStatusName(commonStatusId: string){
    const headers = new HttpHeaders({ 'id': commonStatusId + '' });
    return this.commonHttpService.getById(headers, Configuration.TERMDEPOSITS + Configuration.COMMON_STATUS+ Configuration.GET);
  }
}
