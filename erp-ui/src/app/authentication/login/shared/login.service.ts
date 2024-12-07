import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/configurations/configurations-constants';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private commonHttpService: CommonHttpService, private commonFunctionsService: CommonFunctionsService) { }

  sendMobileOTP(mobileNumber:any){
    const httpHeaders = new HttpHeaders({'id' : mobileNumber+''});
    return this.commonHttpService.getById( httpHeaders, Configuration.RBAC + applicationConstants.USERS + applicationConstants.SEND_MOBILE_OTP);
  }

  sendEmialOTP(email:any){
    const httpHeaders = new HttpHeaders({'id' : email+''});
    return this.commonHttpService.getById(httpHeaders, Configuration.RBAC + applicationConstants.USERS + applicationConstants.SEND_EMAIL_OTP);
  }

  checkUserLoginWithMobileOTP(){

  }
}
