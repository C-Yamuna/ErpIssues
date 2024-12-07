import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class FdCumulativeJointHolderService {

  constructor(private commonHttpService : CommonHttpService) { }

  saveFdCummJiontHolderDetails(jointAccHolderDetails:any){
    return this.commonHttpService.post(jointAccHolderDetails, Headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_JOINT_ACC_HOLDER_DETAILS+ ERP_TRANSACTION_CONSTANTS.SAVE_LIST_FD_NON_CUMULATIVE_JOINT_DETAILS);
  }
  getFdCummJiontHolderDetailsApplicationId(fdCummulativeAccId: string) {
    let headers = new HttpHeaders({ 'fdCummulativeAccId': fdCummulativeAccId + '' })
    return this.commonHttpService.getById(headers, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FD_CUMULATIVE_JOINT_ACC_HOLDER_DETAILS + ERP_TRANSACTION_CONSTANTS.GET_JOINT_HOLDER_DETAILS_BY_FD_CIMMULATIVE_ACC_ID);
  }
}
