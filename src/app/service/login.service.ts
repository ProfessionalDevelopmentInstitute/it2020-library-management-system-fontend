import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient, HttpHeaders} from '@angular/common/http';
import {StudentModel} from '../model/student.model';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {LoginModel} from '../model/login.model';
import {LibrarianModel} from '../model/librarian.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(httpBackend: HttpBackend, private httpClient: HttpClient) {
    this.httpClient = new HttpClient(httpBackend);
  }

  public encrypt(login: LoginModel): string {
    const credential = `${login.email}:${login.password}`;
    const encrypt: string = window.btoa(credential);
    return 'Basic ' + encrypt;
  }

  public signIn(login: LoginModel, type: TYPE): Observable<any> {
    const encrypt: string = this.encrypt(login);
    const httpHeader: HttpHeaders = new HttpHeaders({
      Authorization: encrypt
    });

    return this.httpClient.post<any>(
      'http://localhost:8081/libMgmtSystem/' + type + '/login',
      null,
      {headers: httpHeader}
    );
  }

}

export enum TYPE {
  Student = 'student', Librarian = 'librarian'
}
