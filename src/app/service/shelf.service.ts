import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseModel} from '../model/response.model';

@Injectable({
  providedIn: 'root'
})
export class ShelfService {

  constructor(private httpClient: HttpClient) { }
  getShelves(): Observable<ResponseModel>{
    return this.httpClient.get<ResponseModel>('http://localhost:8081/libMgmtSystem/shelfs');
  }
}
