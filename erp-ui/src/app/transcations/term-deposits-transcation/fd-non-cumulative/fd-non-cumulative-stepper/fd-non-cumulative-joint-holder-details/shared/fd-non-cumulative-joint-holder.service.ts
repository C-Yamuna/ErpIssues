import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class FdNonCumulativeJointHolderService {

  constructor(private commonHttpService : CommonHttpService) { }

  saveFdNonCummJiontHolderDetails(jointAccHolderDetails:any){
    return this.commonHttpService.post(jointAccHolderDetails, Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_NON_CUMULATIVE_JOINT_DETAILS+ ERP_TRANSACTION_CONSTANTS.SAVE_LIST_FD_NON_CUMULATIVE_JOINT_DETAILS);
  }
}
