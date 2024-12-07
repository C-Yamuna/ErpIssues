import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateSbServices(object:any){
    return this.commonHttpService.put(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.SB_SERVICES_CHARGES + Configuration.UPDATE);
  }

  addSbServices(object:any){
    return this.commonHttpService.post(object, Headers, Configuration.DEMANDDEPOSITS + Configuration.SB_SERVICES_CHARGES+ Configuration.ADD);
  }

  getAllSbServicesTypes(){
    return this.commonHttpService.getAll(Configuration.DEMANDDEPOSITS + Configuration.SB_SERVICE_TYPES + Configuration.GET_ALL);
  }
  getAllSbServices(){
    return this.commonHttpService.getAll(Configuration.DEMANDDEPOSITS + Configuration.SB_SERVICES_CHARGES + Configuration.GET_ALL);
  }

  getSbServices(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.DEMANDDEPOSITS + Configuration.SB_SERVICES_CHARGES + Configuration.GET);
  }

  deleteSbServices(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.DEMANDDEPOSITS + Configuration.SB_SERVICES_CHARGES + Configuration.DELETE);
  }

  getSbServicesBySbId(id: any){
    let headers = new HttpHeaders({ 'sbAccId': id + '', })
    return this.commonHttpService.getById( headers, Configuration.DEMANDDEPOSITS + Configuration.SB_SERVICES_CHARGES + Configuration.SB_SERVICES_BY_SB_ID);
  }

  getServiceChargesConfigDetailsByProductIdAndServiceTypeId(productId :any){
    let headers = new HttpHeaders({  'productId': productId+''})
    return this.commonHttpService.getById(headers,ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.SB_SERVICE_CHARGES_CONFIGURATION + ERP_TRANSACTION_CONSTANTS.GET_SB_SERVICE_CHARGES_CONFIG_DETAILS_BY_PRODUCT_ID);
  }
}
