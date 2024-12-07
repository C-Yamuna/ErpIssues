import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class FdCummulativeProductDefinitionService {
  constructor(private commonHttpService: CommonHttpService) { }

  updateFdCummulativeProductDefinition(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addFdCummulativeProductDefinition(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getFdCummulativeProductDefinitionById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET);
  }
  getAllFdCummulativeProductDefinition(){
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET_ALL);
  }
  deleteFdCummulativeProductDefinition(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.DELETE);
  }
 getProductOverviewById(id: any) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET_PRODUCT_OVERVIEW_BY_ID);
  }
  getApprovedFdCummulativeProducts(id: any) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_PRODUCT_DEFINITION + ERP_TRANSACTION_CONSTANTS.GET_APPROVED_FD_CUMULATIVE_PRODUCTS);
  }
}
