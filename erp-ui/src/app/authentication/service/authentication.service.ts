import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { applicationConstants } from '../../shared/applicationConstants';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Loginmodel } from '../login/shared/login.model';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { Configuration } from 'src/app/configurations/configurations-constants';

@Injectable()
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Loginmodel>;
  public currentUser: Observable<Loginmodel>;
  constructor(private commonHttpService: CommonHttpService,private http: HttpClient) { 
    let user:any = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<Loginmodel>(JSON.parse(user));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): Loginmodel {
    return this.currentUserSubject.value;
}
  login(authentication: any) {
    const httpOptions = {
      headers: ''
    };
    return this.commonHttpService.post(authentication, httpOptions.headers, Configuration.RBAC + applicationConstants.USERS + applicationConstants.CHECK_USER_LOGIN)
  }
  //get employee by login user
 /*  getEmployeeInfo(empId) {
    let headers = new HttpHeaders({ "id": empId + '' })
    //return this.commonHttpService.getAll(applicationConstants.LEAVE_MANAGEMENT + applicationConstants.LEAVE_MANAGEMENT_URL + applicationConstants.GET_EMP)
    return this.commonHttpService.getById(headers,applicationConstants.EMPLOYEE+applicationConstants.GET_EMP_DETAILS)
  } */
  checkUserLogin(users: Loginmodel){
    const httpHeaders = new HttpHeaders({});
    return this.commonHttpService.post(users, httpHeaders, Configuration.RBAC + applicationConstants.USERS + applicationConstants.SIGN_IN);
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    let user:any = localStorage.getItem('currentUser');
    this.currentUserSubject.next(user);
}




 
}
