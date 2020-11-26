import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseModel} from '../model/response.model';
import {BookCategory} from '../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  getBookCategory(): Observable<ResponseModel> {
    return  this.httpClient.get<ResponseModel>('http://localhost:8081/libMgmtSystem/categories');
  }

  // getBookId(id: number): Observable<ResponseModel>{
  //   return this.httpClient.get<ResponseModel>('http://localhost:8081/libMgmtSystem/book/' + id);
  // }

  createBookCategory(addBook: BookCategory): Observable<any>{
    return this.httpClient.post('http://localhost:8081/libMgmtSystem/category', addBook);
  }

}

