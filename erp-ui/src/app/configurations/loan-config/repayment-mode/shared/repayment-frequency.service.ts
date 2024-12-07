import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class RepaymentFrequencyService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateRepaymentMode(object:any){
    return this.commonHttpService.put(object, Headers, Configuration.LOANS + Configuration.REPAYMENT_FREQUENCY + Configuration.UPDATE);
  }

  addRepaymentMode(object:any){
    return this.commonHttpService.post(object, Headers, Configuration.LOANS + Configuration.REPAYMENT_FREQUENCY+ Configuration.ADD);
  }

  getAllRepaymentMode(){
    return this.commonHttpService.getAll(Configuration.LOANS + Configuration.REPAYMENT_FREQUENCY + Configuration.GET_ALL);
  }

  getRepaymentModeById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.LOANS + Configuration.REPAYMENT_FREQUENCY + Configuration.GET);
  }

  deleteRepaymentMode(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.LOANS + Configuration.REPAYMENT_FREQUENCY + Configuration.DELETE);
  }
}
