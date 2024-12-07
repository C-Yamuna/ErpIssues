import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class TermDepositTypesService {

  constructor(private commonHttpService:CommonHttpService) { }

  
  updateTermDepositTypes(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, Configuration.TERMDEPOSITS+ Configuration.TD_FORM_TYPES + Configuration.UPDATE)
  }
  addTermDepositTypes(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, Configuration.TERMDEPOSITS+ Configuration.TD_FORM_TYPES + Configuration.ADD)
  }
  getAllTermDepositTypes() {
    return this.commonHttpService.getAll(Configuration.TERMDEPOSITS+ Configuration.TD_FORM_TYPES + Configuration.GET_ALL)
  }
  getTermDepositTypes(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, Configuration.TERMDEPOSITS+ Configuration.TD_FORM_TYPES + Configuration.GET)
  }
  deleteTermDepositTypes(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, Configuration.TERMDEPOSITS+ Configuration.TD_FORM_TYPES + Configuration.DELETE)
  }
}
