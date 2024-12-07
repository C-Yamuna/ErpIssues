import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class SeasonTypesService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSeasonTypes(seasonTypesModel:any){
    return this.commonHttpService.put(seasonTypesModel, Headers, Configuration.MEMBERSHIP + Configuration.SEASON_TYPES + Configuration.UPDATE);
  }

  addSeasonTypes(seasonTypesModel:any){
    return this.commonHttpService.post(seasonTypesModel, Headers, Configuration.MEMBERSHIP + Configuration.SEASON_TYPES+ Configuration.ADD);
  }

  getAllSeasonTypes(){
    return this.commonHttpService.getAll(Configuration.MEMBERSHIP + Configuration.SEASON_TYPES + Configuration.GET_ALL);
  }

  getSeasonTypesById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.MEMBERSHIP + Configuration.SEASON_TYPES + Configuration.GET);
  }

  deleteSeasonTypes(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.MEMBERSHIP + Configuration.SEASON_TYPES + Configuration.DELETE);
  }
}
