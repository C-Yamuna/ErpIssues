import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class AssetTypesService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateAssetTypes(assetTypesModel:any){
    return this.commonHttpService.put(assetTypesModel, Headers, Configuration.MEMBERSHIP + Configuration.ASSET_TYPES + Configuration.UPDATE);
  }

  addAssetTypes(assetTypesModel:any){
    return this.commonHttpService.post(assetTypesModel, Headers, Configuration.MEMBERSHIP + Configuration.ASSET_TYPES+ Configuration.ADD);
  }

  getAllAssetTypes(){
    return this.commonHttpService.getAll(Configuration.MEMBERSHIP + Configuration.ASSET_TYPES + Configuration.GET_ALL);
  }

  getAssetTypesById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.MEMBERSHIP + Configuration.ASSET_TYPES + Configuration.GET);
  }

  deleteAssetTypes(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.MEMBERSHIP + Configuration.ASSET_TYPES + Configuration.DELETE);
  }
}
