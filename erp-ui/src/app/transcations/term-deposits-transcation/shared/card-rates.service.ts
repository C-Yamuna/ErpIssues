import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class CardRatesService {

  constructor(private commonHttpService : CommonHttpService) { }

  updateCardRates(TermDepostModel: any) {
    return this.commonHttpService.put(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.CARD_RATES + ERP_TRANSACTION_CONSTANTS.UPDATE)
  }
  addCardRates(TermDepostModel: any) {
    return this.commonHttpService.post(TermDepostModel,Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.CARD_RATES + ERP_TRANSACTION_CONSTANTS.ADD)
  }
  getCardRatesByPacsId(pacsId: string) {
    let headers = new HttpHeaders({ 'pacsId': pacsId + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.CARD_RATES + ERP_TRANSACTION_CONSTANTS.GET_CARD_RATES_BY_PACS_ID)
  }
  getAllCardRates() {
    return this.commonHttpService.getAll(ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.CARD_RATES + ERP_TRANSACTION_CONSTANTS.GET_ALL)
  }
  getCardRatesById(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.CARD_RATES + ERP_TRANSACTION_CONSTANTS.GET)
  }
  deleteCardRates(id: string) {
    let headers = new HttpHeaders({ 'id': id + '' })
    return this.commonHttpService.delete(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS+ ERP_TRANSACTION_CONSTANTS.CARD_RATES + ERP_TRANSACTION_CONSTANTS.DELETE)
  }
}
