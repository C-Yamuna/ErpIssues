import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';
import { TermDepostModel } from './term-depost-model.model';

@Injectable({
  providedIn: 'root'
})
export class RdProductDefinitionService {

  constructor(private commonHttpService : CommonHttpService) { }
  updateRdProductDefinition(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addRdProductDefinition(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getAllRdProductDefinition() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getRdProductDefinition(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET)
  }
  deleteRdProductDefinition(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.DELETE)
  }
  getProductOverviewById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET_PRODUCT_OVERVIEW_BY_ID)
  }
  getApprovedRdProductDefinition() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET_APPROVED_RD_PRODUCT_DEFINITION  
    )
  }
}
