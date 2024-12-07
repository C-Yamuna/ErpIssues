import { from as observableFrom, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders
} from '@angular/common/http';
import { CommonFunctionsService } from '../shared/commonfunction.service';
import { applicationConstants } from '../shared/applicationConstants';

@Injectable()
export class ErpInterceptor implements HttpInterceptor {
  constructor(private commonService: CommonFunctionsService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return observableFrom(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    const token = this.commonService.getAuthToken();
    const user = this.commonService.getUserFromSession();

    let changedRequest = request;
    const headerSettings: { [name: string]: string | string[] } = {};

    for (const key of request.headers.keys()) {
      const headerValue = request.headers.getAll(key);
      if (headerValue !== null) {
        headerSettings[key] = headerValue;
      }
    }

    if (token != undefined || token != null) {
      headerSettings[applicationConstants.HEADER_AUTHEN_KEY] = token;
    }
    if (user) {
      headerSettings[applicationConstants.HEADER_USER_KEY] = user;
    }
    headerSettings[applicationConstants.HEADER_CONTENT_TYPE] = 'application/json';

    const newHeader = new HttpHeaders(headerSettings);

    changedRequest = request.clone({ headers: newHeader });

    return next.handle(changedRequest).toPromise().then((result: HttpEvent<any> | undefined): HttpEvent<any> => {
      if (result instanceof HttpResponse) {
        let newToken = result.headers.get('authToken');
        const newUserId = result.headers.get('userid');
        if (newToken != null) {
          this.commonService.saveAuthToken(newToken);
        }
        if (newUserId != null) {
          this.commonService.setUserInSession(newUserId);
        }
      }
      // Always return result to ensure it is an HttpEvent
      return result as HttpEvent<any>;
    });
  }
  
}



