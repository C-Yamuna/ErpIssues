import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class FinancialBankDetailsService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateFinancialBankDetails(financialbankdetailsModel:any){
    return this.commonHttpService.put(financialbankdetailsModel, Headers, Configuration.BORROWINGS + Configuration.FINANCIAR_BANK_DETAILS + Configuration.UPDATE);
  }

  addFinancialBankDetails(financialbankdetailsModel:any){
    return this.commonHttpService.post(financialbankdetailsModel, Headers, Configuration.BORROWINGS + Configuration.FINANCIAR_BANK_DETAILS+ Configuration.ADD);
  }

  getAllFinancialBankDetails(){
    return this.commonHttpService.getAll(Configuration.BORROWINGS + Configuration.FINANCIAR_BANK_DETAILS + Configuration.GET_ALL);
  }

  getFinancialBankDetailsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.BORROWINGS + Configuration.FINANCIAR_BANK_DETAILS + Configuration.GET);
  }

  deleteFinancialBankDetails(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.BORROWINGS + Configuration.FINANCIAR_BANK_DETAILS + Configuration.DELETE);
  }
}

