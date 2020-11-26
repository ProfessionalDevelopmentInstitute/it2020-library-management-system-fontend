import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseModel} from '../model/response.model';

@Injectable({
  providedIn: 'root'
})
export class FileService{

  constructor(private httpClient: HttpClient) { }
  getFileImage(): Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>('http://localhost:8081/libMgmtSystem/file/get/');
  }

}
