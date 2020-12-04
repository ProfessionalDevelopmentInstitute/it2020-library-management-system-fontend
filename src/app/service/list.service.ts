import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ResponseModel} from '../model/response.model';
import {BookModel} from '../model/book.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private httpClient: HttpClient) { }

  getBooks(): Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>('http://localhost:8081/libMgmtSystem/books');
  }

  deleteBook(id: number): Observable<ResponseModel>{
    return this.httpClient.delete<ResponseModel>('http://localhost:8081/libMgmtSystem/book/' + id);
  }

  getCategoryId(id: number): Observable<ResponseModel> {
    return  this.httpClient.get<ResponseModel>('http://localhost:8081/libMgmtSystem/findByCategory/' + id);
  }

  createBook(addBook: BookModel): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>('http://localhost:8081/libMgmtSystem/book/', addBook);
  }

  updateBook(updateResult: BookModel[]): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>('http://localhost:8081/libMgmtSystem/book/', updateResult);
  }

}



