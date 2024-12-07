import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class CommonCategoryService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateCommonCategory(commoncategoryModel:any){
    return this.commonHttpService.put(commoncategoryModel, Headers, Configuration.BORROWINGS + Configuration.COMMON_CATEGORY + Configuration.UPDATE);
  }

  addCommonCategory(commoncategoryModel:any){
    return this.commonHttpService.post(commoncategoryModel, Headers, Configuration.BORROWINGS + Configuration.COMMON_CATEGORY+ Configuration.ADD);
  }
  getAllCategoryWithCategoryStatus(){
    return this.commonHttpService.getAll(Configuration.BORROWINGS + Configuration.COMMON_CATEGORY + Configuration.GET_ALL_CATEGORY_WITH_CATEGORY_STATUS);
  }

  getAllCommonCategory(){
    return this.commonHttpService.getAll(Configuration.BORROWINGS + Configuration.COMMON_CATEGORY + Configuration.GET_ALL);
  }

  getCommonCategoryById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.BORROWINGS + Configuration.COMMON_CATEGORY + Configuration.GET);
  }

  deleteCommonCategory(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.BORROWINGS + Configuration.COMMON_CATEGORY + Configuration.DELETE);
  }

  updateCommonStatus(commonstatusModel:any){
    return this.commonHttpService.put(commonstatusModel, Headers, Configuration.BORROWINGS + Configuration.COMMON_STATUS + Configuration.UPDATE);
  }

  addCommonStatus(commonstatusModel:any){
    return this.commonHttpService.post(commonstatusModel, Headers, Configuration.BORROWINGS + Configuration.COMMON_STATUS+ Configuration.ADD);
  }
  getCommonStatusByCategoryId(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById(headers,Configuration.BORROWINGS + Configuration.COMMON_STATUS + Configuration.COMMON_STATUS_LIST_BY_CATEGORY);
  
  }
  
  getAllCommonStatus(){
    return this.commonHttpService.getAll(Configuration.BORROWINGS + Configuration.COMMON_STATUS + Configuration.GET_ALL);
  }

  getCommonStatusById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.BORROWINGS + Configuration.COMMON_STATUS + Configuration.GET);
  }

  deleteCommonStatus(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.BORROWINGS + Configuration.COMMON_STATUS + Configuration.DELETE);
  }

  getCommonStatusName(commonStatusId: string){
    const headers = new HttpHeaders({ 'id': commonStatusId + '' });
    return this.commonHttpService.getById(headers, Configuration.BORROWINGS + Configuration.COMMON_STATUS+ Configuration.GET);
  }
  
}
