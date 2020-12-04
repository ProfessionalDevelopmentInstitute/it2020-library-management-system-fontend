import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ResponseModel} from '../model/response.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  constructor(private httpClient: HttpClient) { }
  getCredentials(): Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>('http://localhost:8081/libMgmtSystem/credentials');
  }
}
