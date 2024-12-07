// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class CommonHttpService {

//   constructor() { }
// }

import {throwError as observableThrowError,  Observable, throwError } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable()
export class CommonHttpService {

  constructor(private http: HttpClient) { }

  // GET
  getAll(url: any): Observable<any> {
    return this.http.get<any>(url).pipe(
      map((res: any) => res),
      catchError((err) => {
        // const error = new Error('An error occurred during the HTTP request.');
        return throwError(() => err);
      })
    );
  }

  // GET all headers if headers required(id, authtoken)
  public getAllAuth(headers: any, url: any): Observable<any> {
    const httpOptions = {
      headers: headers
    };
    return this.http.get<any>(url, httpOptions).pipe(
      map((res: any) => res),
      catchError((err) => {
        // const error = new Error('An error occurred during the HTTP request.');
        return throwError(() => err);
      })
    );
  }

  // GET ID
  public getById(headers: any, url: any): Observable<any> {
    const httpOptions = { headers: headers };

    return this.http.get<any>(url, httpOptions).pipe(
      map((res: any) => res),
      catchError((err) => {
        const error = new Error('An error occurred during the HTTP request.');
        return throwError(() => error);
      })
    );
  }

  // POST
  public post(object: any, headers: any, url: any): Observable<any> {
    const httpOptions = { headers: headers };

    return this.http.post<any>(url, object, httpOptions).pipe(
      map((res: any) => res),
      catchError((err) => {
        const error = new Error('An error occurred during the HTTP request.');
        return throwError(() => error);
      })
    );
  }

  // DELETE
  public delete(headers: any, url: any): Observable<any> {
    const httpOptions = { headers: headers };

    return this.http.delete<any>(url, httpOptions).pipe(
      map((res: any) => res),
      catchError((err) => {
        const error = new Error('An error occurred during the HTTP request.');
        return throwError(() => error);
      })
    );
  }

  // UPDATE
  public put(object: any, headers: any, url: any): Observable<any> {
    const httpOptions = { headers: headers };

    return this.http.put<any>(url, object, httpOptions).pipe(
      map((res: any) => res),
      catchError((err) => {
        const error = new Error('An error occurred during the HTTP request.');
        return throwError(() => error);
      })
    );
  }

  // GET all headers if headers required(id, authtoken)
  public getAllMenus(headers: any, url: any): Observable<any> {
    const httpOptions = { headers: headers };

    return this.http.get<any>(url, httpOptions).pipe(
      map((res: any) => res),
      catchError((err) => {
        const error = new Error('An error occurred during the HTTP request.');
        return throwError(() => error);
      })
    );
  }

  // GET Menu Items
  public getMenuItems(user: any): Observable<any> {
    return this.http.get(`assets/menu/${user}-menu.json`).pipe(
      map((res: any) => res),
      catchError((err) => {
        const error = new Error('An error occurred during the HTTP request.');
        return throwError(() => error);
      })
    );
  }

  // GET PDF
  public getPdf(headers: any, url: string): Observable<any> {
    const httpOptions = { headers: headers, responseType: 'blob' as 'json' };

    return this.http.get(url, httpOptions).pipe(
      map((res: any) => res),
      catchError((err) => {
        const error = new Error('An error occurred during the HTTP request.');
        return throwError(() => error);
      })
    );
  }
  
}
