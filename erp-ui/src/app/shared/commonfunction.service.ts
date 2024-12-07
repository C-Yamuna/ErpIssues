import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable ,  BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
//import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { SESSION_STORAGE,WebStorageService } from 'ngx-webstorage-service';
import { applicationConstants } from '../shared/applicationConstants';
import { DatePipe, formatDate } from '@angular/common';

@Injectable()
export class CommonFunctionsService {

  date : any;
  public  dataSource = new BehaviorSubject<any>(this.getStorageValue('language')|| 'en');
   data: any = this.dataSource.asObservable();
  
   constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService , private datePipe: DatePipe) {
     
  }
  saveAuthToken(val:any): void {
    this.storage.set(applicationConstants.HEADER_AUTHEN_KEY, val);
  }

  getAuthToken(): any {
    let authToken:any =  this.storage.get(applicationConstants.HEADER_AUTHEN_KEY);
    if (authToken == null || authToken == undefined) {
      authToken = "eeee";
    }

    return authToken;
  }
  setUserInSession(val:any): void {
    this.storage.set(applicationConstants.HEADER_USER_KEY, val);
  }

  getUserFromSession(): any {
    let userid:number = this.storage.get(applicationConstants.HEADER_USER_KEY);
    if (userid == null || userid == undefined) {
      userid = 1;
    }

    return userid;
  }
  removeToken(): any {
    this.storage.remove(applicationConstants.HEADER_USER_KEY);
    this.storage.remove(applicationConstants.HEADER_AUTHEN_KEY);
    this.storage.remove(applicationConstants.ORG_DATE_FORMATE);
    this.storage.remove(applicationConstants.roleId);
    this.storage.remove(applicationConstants.roleName);
    this.storage.remove(applicationConstants.institutionId);

  }
  setStorageValue(constants:any, val:any): void {
    this.storage.set(constants, val);
  }
  getStorageValue(constant:any): any {
    return this.storage.get(constant);
  }

  removeStorageValue(constant:any): void {
    this.storage.remove(constant);
  }

  getUTCEpoch(date: any) {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let d = Date.UTC(year, month, day);
    return d;
  }
  getUTCEpochWithTime(dateVal: Date) {
    let givenDate = new Date(dateVal);
    let year = givenDate.getUTCFullYear();
    let month = givenDate.getUTCMonth();
    let day = givenDate.getUTCDay();
    let hour = givenDate.getUTCHours();
    let mins = givenDate.getUTCMinutes();
    let secs = givenDate.getUTCSeconds();
    let d = Date.UTC(year, month, day, hour, mins, secs);
    return d;
  }
  

  
  languageSelection(data: any) {
    this.dataSource.next(data);
  }
/**
   * converting html to type string
   * @returns  string data
   */
  convertHTMLtoString(html:any) {
    var temporalDivElement = document.createElement("div");
    temporalDivElement.innerHTML = html;
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
  }
  convertLocalDatetoUTCDateWithoutTime (year:any,month:any){
    return this.getUTCEpoch(new Date(year,month))
    }

  convertLocalDatetoUTCDateWithTime(date:any){
    return this.getUTCEpoch(new Date(date))
    }

     getFinancialYear(){
      let month = new Date().getMonth();
      let financialYear ='';
      if(month>2){
        financialYear=financialYear+new Date().getFullYear()+"-"+(new Date().getFullYear()+1);
      }else{
        financialYear=financialYear+(new Date().getFullYear()-1)+"-"+new Date().getFullYear();
      }
      return financialYear;
     }

     monthDiff(dateFrom: Date, dateTo: Date) {
      return dateTo.getMonth() - dateFrom.getMonth() + 
        (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
     }
     getUTCEpochWithTimedateConversionToLong(dataVal : any){
      if(dataVal != null && dataVal != undefined){
        let dateSplit:any[] = dataVal.split('/');
        if(dateSplit != null && dateSplit != undefined  && dateSplit.length >= 3){
          this.date = this.getUTCEpoch(new Date(dateSplit[2], Number(dateSplit[1]) - 1, dateSplit[0], 0, 0, 0));
        }
      }
      return this.date;
     }

     dateConvertionIntoFormate(date:any){
      const formattedDate = this.datePipe.transform(new Date(date), 'dd/MMM/yyyy');
      let dateVal = formattedDate;
      return dateVal;
     }
     currentDate(){
      let date = new Date();
      const formattedDate = this.datePipe.transform(new Date(date), 'dd/MMM/yyyy');
      return formattedDate;
     }

     dateConvertsionToLong(dataVal : any){
      const formattedDate = dataVal.toUTCString();
      const timestamp = Math.floor(dataVal.getTime() / 1000);
      return timestamp;
     }
}