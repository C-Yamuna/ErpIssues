import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class DamageOrFakeNotesService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateDamageOrFakeNotes(damageorfakenotesModel:any){
    return this.commonHttpService.put(damageorfakenotesModel, Headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.DAMAGED_OR_FAKE_NOTES + ERP_TRANSACTION_CONSTANTS.UPDATE);
  }

  addDamageOrFakeNotes(damageorfakenotesModel:any){
    return this.commonHttpService.post(damageorfakenotesModel, Headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.DAMAGED_OR_FAKE_NOTES+ ERP_TRANSACTION_CONSTANTS.ADD);
  }

  getAllDamageOrFakeNotes(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.DAMAGED_OR_FAKE_NOTES + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }

  getDamageOrFakeNotesById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.DAMAGED_OR_FAKE_NOTES + ERP_TRANSACTION_CONSTANTS.GET);
  }

  deletDamageOrFakeNotes(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, ERP_TRANSACTION_CONSTANTS.CASHCOUNTER + ERP_TRANSACTION_CONSTANTS.DAMAGED_OR_FAKE_NOTES + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
}
