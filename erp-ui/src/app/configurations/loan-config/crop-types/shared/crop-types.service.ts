import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class CropTypesService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateCropTypes(object:any){
    return this.commonHttpService.put(object, Headers, Configuration.LOANS + Configuration.CROP_TYPES + Configuration.UPDATE);
  }

  addCropTypes(object:any){
    return this.commonHttpService.post(object, Headers, Configuration.LOANS + Configuration.CROP_TYPES+ Configuration.ADD);
  }

  getAllCropTypes(){
    return this.commonHttpService.getAll(Configuration.LOANS + Configuration.CROP_TYPES + Configuration.GET_ALL);
  }

  getCropTypesById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.LOANS + Configuration.CROP_TYPES + Configuration.GET);
  }

  deleteCropTypes(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.LOANS + Configuration.CROP_TYPES + Configuration.DELETE);
  }
}
