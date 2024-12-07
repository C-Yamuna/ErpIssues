import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionModesService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateTransactionModes(transactionmodeModel:any){
    return this.commonHttpService.put(transactionmodeModel, Headers, Configuration.COMMON_MASTER + Configuration.TRANSACTION_MODES + Configuration.UPDATE);
  }

  addTransactionModes(transactionmodeModel:any){
    return this.commonHttpService.post(transactionmodeModel, Headers, Configuration.COMMON_MASTER + Configuration.TRANSACTION_MODES+ Configuration.ADD);
  }

  getAllTransactionModes(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.TRANSACTION_MODES + Configuration.GET_ALL);
  }

  getTransactionModesById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.TRANSACTION_MODES + Configuration.GET);
  }

  deleteTransactionModes(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.COMMON_MASTER + Configuration.TRANSACTION_MODES + Configuration.DELETE);
  }
}
