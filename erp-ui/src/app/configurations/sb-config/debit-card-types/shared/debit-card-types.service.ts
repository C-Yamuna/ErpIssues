import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class DebitCardTypesService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateDebitCardTypes(object:any){
    return this.commonHttpService.put(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.DEBIT_CARD_TYPES + Configuration.UPDATE);
  }

  addDebitCardTypes(object:any){
    return this.commonHttpService.post(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.DEBIT_CARD_TYPES+ Configuration.ADD);
  }

  getAllDebitCardTypes(){
    return this.commonHttpService.getAll(Configuration.DEMANDDEPOSITS + Configuration.DEBIT_CARD_TYPES + Configuration.GET_ALL);
  }

  getDebitCardTypesById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.DEMANDDEPOSITS + Configuration.DEBIT_CARD_TYPES + Configuration.GET);
  }

  deleteDebitCardTypes(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.DEMANDDEPOSITS + Configuration.DEBIT_CARD_TYPES + Configuration.DELETE);
  }
}
