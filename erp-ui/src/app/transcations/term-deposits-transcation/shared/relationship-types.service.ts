import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';
import { TermDepostModel } from './term-depost-model.model';

@Injectable({
  providedIn: 'root'
})
export class RelationshipTypesService {

  constructor(private commonHttpService : CommonHttpService) { }
  updateRelationshipTypes(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RELATIONSHIP_TYPES + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addRelationshipTypes(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RELATIONSHIP_TYPES + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getAllRelationshipTypes() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RELATIONSHIP_TYPES + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getRelationshipTypes(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RELATIONSHIP_TYPES + ERP_TRANSACTION_CONSTANTS.GET)
  }
  deleteRelationshipTypes(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RELATIONSHIP_TYPES + ERP_TRANSACTION_CONSTANTS.DELETE)
  }

}
