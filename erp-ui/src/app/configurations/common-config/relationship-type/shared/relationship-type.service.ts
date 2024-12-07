import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class RelationshipTypeService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateRelationshipType(relationshiptypeModel:any){
    return this.commonHttpService.put(relationshiptypeModel, Headers, Configuration.COMMON_MASTER + Configuration.RELATIONSHIP_TYPES + Configuration.UPDATE);
  }

  addRelationshipType(relationshiptypeModel:any){
    return this.commonHttpService.post(relationshiptypeModel, Headers, Configuration.COMMON_MASTER + Configuration.RELATIONSHIP_TYPES+ Configuration.ADD);
  }

  getAllRelationshipType(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.RELATIONSHIP_TYPES + Configuration.GET_ALL);
  }

  getRelationshipTypeById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.RELATIONSHIP_TYPES + Configuration.GET);
  }

  deleteRelationshipType(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.COMMON_MASTER + Configuration.RELATIONSHIP_TYPES + Configuration.DELETE);
  }
}
