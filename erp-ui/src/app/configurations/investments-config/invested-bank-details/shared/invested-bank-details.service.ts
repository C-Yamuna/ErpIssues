import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class InvestedBankDetailsService {
  
  constructor(private commonHttpService:CommonHttpService) { }

  updateInvestedBankDetails(kycDcoumentTypeModel:any){
    return this.commonHttpService.put(kycDcoumentTypeModel, Headers, Configuration.INVESTMENTS + Configuration.INVESTED_BANK_DETAILS + Configuration.UPDATE);
  }

  updateInvestedBankDetailsStatus(kycDcoumentTypeModel:any){
    return this.commonHttpService.put(kycDcoumentTypeModel, Headers, Configuration.INVESTMENTS + Configuration.INVESTED_BANK_DETAILS + Configuration.UPDATE_INVESTED_BANK_DETAILS_STATUS);
  }  

  addInvestedBankDetails(kycDcoumentTypeModel:any){
    return this.commonHttpService.post(kycDcoumentTypeModel, Headers, Configuration.INVESTMENTS + Configuration.INVESTED_BANK_DETAILS+ Configuration.ADD);
  }

  getAllInvestedBankDetails(){
    return this.commonHttpService.getAll(Configuration.INVESTMENTS + Configuration.INVESTED_BANK_DETAILS + Configuration.GET_ALL);
  }

  getInvestedBankDetailsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.INVESTMENTS + Configuration.INVESTED_BANK_DETAILS + Configuration.GET);
  }

  deleteInvestedBankDetails(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.INVESTMENTS + Configuration.INVESTED_BANK_DETAILS + Configuration.DELETE);
  }
}
