import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseModel} from '../model/response.model';
import {BookModel} from '../model/book.model';
import {Shelf} from '../model/shelf.model';

@Injectable({
  providedIn: 'root'
})
export class ShelfService {

  constructor(private httpClient: HttpClient) { }

  getShelves(): Observable<ResponseModel>{
    return this.httpClient.get<ResponseModel>('http://localhost:8081/libMgmtSystem/shelves');
  }

  deleteShelf(id: number): Observable<ResponseModel>{
    return this.httpClient.delete<ResponseModel>('http://localhost:8081/libMgmtSystem/shelf/' + id);
  }

  createShelf(addS: Shelf): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>('http://localhost:8081/libMgmtSystem/create/shelf/', addS);
  }

  updateShelf(updateResult: Shelf[]): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>('http://localhost:8081/libMgmtSystem/update/shelf/', updateResult);
  }
}
