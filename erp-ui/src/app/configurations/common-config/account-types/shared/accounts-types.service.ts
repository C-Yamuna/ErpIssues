import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsTypesService {
  
  constructor(private commonHttpService:CommonHttpService) { }

  updateAccountsTypes(accounttypesModel:any){
    return this.commonHttpService.put(accounttypesModel, Headers, Configuration.COMMON_MASTER + Configuration.ACCOUNTS_TYPES + Configuration.UPDATE);
  }

  addAccountsTypes(accounttypesModel:any){
    return this.commonHttpService.post(accounttypesModel, Headers, Configuration.COMMON_MASTER + Configuration.ACCOUNTS_TYPES+ Configuration.ADD);
  }

  getAllAccountsTypes(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.ACCOUNTS_TYPES + Configuration.GET_ALL);
  }

  getAccountsTypesById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.ACCOUNTS_TYPES + Configuration.GET);
  }

  deleteAccountsTypes(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.COMMON_MASTER + Configuration.ACCOUNTS_TYPES + Configuration.DELETE);
  }
}
