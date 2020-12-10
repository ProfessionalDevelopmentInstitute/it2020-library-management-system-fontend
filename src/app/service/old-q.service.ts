import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ResponseModel} from '../model/response.model';
import {BookModel} from '../model/book.model';
import {HttpClient} from '@angular/common/http';
import {OqModel} from '../model/oq.model';
import {add} from 'ngx-bootstrap/chronos';

@Injectable({
  providedIn: 'root'
})
export class OldQService {

  constructor(private httpClient: HttpClient) { }

  getOQs(): Observable<ResponseModel>{
    return this.httpClient.get<ResponseModel>('http://localhost:8081/libMgmtSystem/oqs');
  }

  deleteOQ(id: number): Observable<ResponseModel>{
    return this.httpClient.delete<ResponseModel>('http://localhost:8081/libMgmtSystem/oq/' + id);
  }

  createOQ(addOQ: OqModel): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>('http://localhost:8081/libMgmtSystem/create/oq/', addOQ);
  }

  updateOQ(u: OqModel[]): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>('http://localhost:8081/libMgmtSystem/update/oq/', u);
  }
}