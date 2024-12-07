import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class KycDocumentTypesService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateKycDocumentType(kycdocumentModel:any){
    return this.commonHttpService.put(kycdocumentModel, Headers, Configuration.COMMON_MASTER + Configuration.KYC_DOC_TYPES + Configuration.UPDATE);
  }

  addKycDocumentType(kycdocumentModel:any){
    return this.commonHttpService.post(kycdocumentModel, Headers, Configuration.COMMON_MASTER + Configuration.KYC_DOC_TYPES+ Configuration.ADD);
  }

  getAllKycDocumentType(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.KYC_DOC_TYPES + Configuration.GET_ALL);
  }

  getKycDocumentTypeById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.KYC_DOC_TYPES + Configuration.GET);
  }

  deleteKycDocumentType(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.COMMON_MASTER + Configuration.KYC_DOC_TYPES + Configuration.DELETE);
  }
}
