import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';
import { TermDepostModel } from './term-depost-model.model';

@Injectable({
  providedIn: 'root'
})
export class InistitutePromoterDetailsService {

  constructor(private commonHttpService : CommonHttpService) { }
  updateInistituionPromoterDetails(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.INISTITUTION_PROMOTER_DETAILS + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addInistituionPromoterDetails(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.INISTITUTION_PROMOTER_DETAILS + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getAllInistituionPromoterDetails() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.INISTITUTION_PROMOTER_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getInistituionPromoterDetailss(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.INISTITUTION_PROMOTER_DETAILS + ERP_TRANSACTION_CONSTANTS.GET)
  }
  getInistituionPromoterDetailsByInistitutionIdAndPacsId(id: string,pacsId: string) {
    let headers = new HttpHeaders({ 'id': id + '','pacsId': pacsId + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.INISTITUTION_PROMOTER_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_INISTITUTION_PROMOTER_DETAILS_BY_INISTITUTIONID_AND_PACSID)
  }
  deleteInistituionPromoterDetails(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.INISTITUTION_PROMOTER_DETAILS + ERP_TRANSACTION_CONSTANTS.DELETE)
  }
}
