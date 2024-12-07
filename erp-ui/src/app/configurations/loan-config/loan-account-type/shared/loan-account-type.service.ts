import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class LoanAccountTypeService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateLoanAccountType(object:any){
    return this.commonHttpService.put(object, Headers, Configuration.COMMON_MASTER + Configuration.ACCOUNTS_TYPES + Configuration.UPDATE);
  }

  addLoanAccountType(object:any){
    return this.commonHttpService.post(object, Headers, Configuration.COMMON_MASTER + Configuration.ACCOUNTS_TYPES + Configuration.ADD);
  }

  getAllLoanAccountType(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.ACCOUNTS_TYPES + Configuration.GET_ALL);
  }

  getLoanAccountTypeById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.ACCOUNTS_TYPES + Configuration.GET);
  }

  deleteLoanAccountType(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.COMMON_MASTER + Configuration.ACCOUNTS_TYPES + Configuration.DELETE);
  }

}
