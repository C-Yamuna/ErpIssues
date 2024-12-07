import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { CommonHttpService } from 'src/app/shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class LockerVendorDetailsService {

  constructor(private commonHttpService:CommonHttpService) { }

  updateLockerVendorDetails(lockervendoedetailsModel:any){
    return this.commonHttpService.put(lockervendoedetailsModel, Headers, Configuration.LOCKERS + Configuration.LOCKER_VENDOR_DETAILS + Configuration.UPDATE);
  }
  addLockerVendorDetails(lockervendoedetailsModel:any){
    return this.commonHttpService.post(lockervendoedetailsModel, Headers, Configuration.LOCKERS + Configuration.LOCKER_VENDOR_DETAILS+ Configuration.ADD);
  }

  getAllLockerVendorDetails(){
    return this.commonHttpService.getAll(Configuration.LOCKERS + Configuration.LOCKER_VENDOR_DETAILS + Configuration.GET_ALL);
  }

  getLockerVendorDetailsById(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.getById( headers, Configuration.LOCKERS + Configuration.LOCKER_VENDOR_DETAILS + Configuration.GET);
  }

  deleteLockerVendorDetails(id: any){
    let headers = new HttpHeaders({ 'id': id + '', })
    return this.commonHttpService.delete( headers, Configuration.LOCKERS + Configuration.LOCKER_VENDOR_DETAILS + Configuration.DELETE);
  }
}
