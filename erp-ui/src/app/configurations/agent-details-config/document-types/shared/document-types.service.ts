import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypesService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateDocumentType(kycdocumentModel:any){
    return this.commonHttpService.put(kycdocumentModel, Headers, Configuration.AGENTDETAILS + Configuration.DOC_TYPES + Configuration.UPDATE);
  }

  addDocumentType(kycdocumentModel:any){
    return this.commonHttpService.post(kycdocumentModel, Headers, Configuration.AGENTDETAILS + Configuration.DOC_TYPES+ Configuration.ADD);
  }

  getAllDocumentType(){
    return this.commonHttpService.getAll(Configuration.AGENTDETAILS + Configuration.DOC_TYPES + Configuration.GET_ALL);
  }

  getDocumentTypeById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.AGENTDETAILS + Configuration.DOC_TYPES + Configuration.GET);
  }

  deleteDocumentType(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.AGENTDETAILS + Configuration.DOC_TYPES + Configuration.DELETE);
  }
}
