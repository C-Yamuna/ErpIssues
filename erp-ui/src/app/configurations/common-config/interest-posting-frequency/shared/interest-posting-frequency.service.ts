import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
@Injectable({
  providedIn: 'root'
})
export class InterestPostingFrequencyService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateInterestPostingFrequency(interestpostingfrequencyModel:any){
    return this.commonHttpService.put(interestpostingfrequencyModel, Headers, Configuration.COMMON_MASTER + Configuration.INTEREST_POSTING_FREQUENCYS + Configuration.UPDATE);
  }

  addInterestPostingFrequency(interestpostingfrequencyModel:any){
    return this.commonHttpService.post(interestpostingfrequencyModel, Headers, Configuration.COMMON_MASTER + Configuration.INTEREST_POSTING_FREQUENCYS+ Configuration.ADD);
  }

  getAllInterestPostingFrequency(){
    return this.commonHttpService.getAll(Configuration.COMMON_MASTER + Configuration.INTEREST_POSTING_FREQUENCYS + Configuration.GET_ALL);
  }

  getInterestPostingFrequencyById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.COMMON_MASTER + Configuration.INTEREST_POSTING_FREQUENCYS + Configuration.GET);
  }

  deleteInterestPostingFrequency(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.COMMON_MASTER + Configuration.INTEREST_POSTING_FREQUENCYS + Configuration.DELETE);
  }
}
