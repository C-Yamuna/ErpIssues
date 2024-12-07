import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { HttpHeaders } from '@angular/common/http';
import { TermDepostModel } from './term-depost-model.model';

@Injectable({
  providedIn: 'root'
})
export class RdInterestPolicyConfigService {

  constructor(private commonHttpService : CommonHttpService) { }
  updateRdInterestPolicyConfig(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_INTEREST_POLICY_CONFIG + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addRdInterestPolicyConfig(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_INTEREST_POLICY_CONFIG + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getAllRdInterestPolicyConfig() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_INTEREST_POLICY_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getRdInterestPolicyConfig(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_INTEREST_POLICY_CONFIG + ERP_TRANSACTION_CONSTANTS.GET)
  }
  deleteRdInterestPolicyConfig(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_INTEREST_POLICY_CONFIG + ERP_TRANSACTION_CONSTANTS.DELETE)
  }
  getInterestPolicyConfigById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.RD_INTEREST_POLICY_CONFIG + ERP_TRANSACTION_CONSTANTS.GET_INTEREST_POLICY_CONFIG_BY_PRODUCT_ID)
  }
}
