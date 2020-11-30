import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginManagerService} from './login-manager.service';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthService implements HttpInterceptor{

  constructor(private loginManager: LoginManagerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.loginManager.studentModel && this.loginManager.credential){
      const httpHeader: HttpHeaders = new HttpHeaders({
        Authorization: this.loginManager.credential
      });
      req = req.clone({
        headers: httpHeader
      });
    }
    return next.handle(req);
  }
}
