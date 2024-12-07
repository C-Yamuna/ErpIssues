import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class CounterwiseDifferenceAmountService {
  constructor(private commonHttpService:CommonHttpService) { }

  updateCounterwiseDifferenceAmount(counterwisedifferenceamountModel:any){
    return this.commonHttpService.put(counterwisedifferenceamountModel, Headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.COUNTER_WISE_DIFFERENCE_AMOUNT_DENOMINATION + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addCounterwiseDifferenceAmount(counterwisedifferenceamountModel:any){
    return this.commonHttpService.post(counterwisedifferenceamountModel, Headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.COUNTER_WISE_DIFFERENCE_AMOUNT_DENOMINATION+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllCounterwiseDifferenceAmount(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.COUNTER_WISE_DIFFERENCE_AMOUNT_DENOMINATION + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getCounterwiseDifferenceAmountById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.COUNTER_WISE_DIFFERENCE_AMOUNT_DENOMINATION + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deletCounterwiseDifferenceAmount(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.COUNTER_WISE_DIFFERENCE_AMOUNT_DENOMINATION + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
