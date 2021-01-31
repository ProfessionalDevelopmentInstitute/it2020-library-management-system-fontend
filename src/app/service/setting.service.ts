import { Injectable } from '@angular/core';
import {LibrarianModel} from '../model/librarian.model';
import {Observable} from 'rxjs';
import {ResponseModel} from '../model/response.model';
import {HttpClient} from '@angular/common/http';
import {CredentialpojoModel} from '../model/credentialpojo.model';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private httpClient: HttpClient) { }

  updatePassword(updC: CredentialpojoModel[]): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>('http://localhost:8081/libMgmtSystem/update/password/', updC);
  }
}
