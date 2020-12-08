import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ResponseModel} from '../model/response.model';
import {HttpClient} from '@angular/common/http';
import {LibrarianModel} from '../model/librarian.model';
import {LibraryCardModel} from '../model/library-card.model';
import {BookModel} from '../model/book.model';

@Injectable({
  providedIn: 'root'
})
export class LibraryCardService {

  constructor(private httpClient: HttpClient) { }
  getLibraryCard(): Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>(`http://localhost:8081/libMgmtSystem/libraryCards`);
  }
  searchByRollNo(rollNo: string): Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>('http://localhost:8081/libMgmtSystem/search/libraryCard?rollNo=' + rollNo);
  }
  createLibraryCard(addCard: LibraryCardModel): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>('http://localhost:8081/libMgmtSystem/create/libraryCard/', addCard);
  }

  deleteLibCard(id: number): Observable<ResponseModel>{
    return this.httpClient.delete<ResponseModel>('http://localhost:8081/libMgmtSystem/libraryCard/' + id);
  }

  updateLibCard(updateCard: LibraryCardModel[]): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>('http://localhost:8081/libMgmtSystem/update/libraryCard/', updateCard);
  }
}
