import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class LoanPurposeService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateLoanPurpose(object:any){
    return this.commonHttpService.put(object, Headers, Configuration.LOANS + Configuration.LOAN_PURPOSE + Configuration.UPDATE);
  }

  addLoanPurpose(object:any){
    return this.commonHttpService.post(object, Headers, Configuration.LOANS + Configuration.LOAN_PURPOSE+ Configuration.ADD);
  }

  getAllLoanPurpose(){
    return this.commonHttpService.getAll(Configuration.LOANS + Configuration.LOAN_PURPOSE + Configuration.GET_ALL);
  }

  getLoanPurposeById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.LOANS + Configuration.LOAN_PURPOSE + Configuration.GET);
  }

  deleteLoanPurpose(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.LOANS + Configuration.LOAN_PURPOSE + Configuration.DELETE);
  }
}
