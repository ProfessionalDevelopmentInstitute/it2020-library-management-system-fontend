import { Injectable } from '@angular/core';
import {LibrarianModel} from '../model/librarian.model';
import {Observable} from 'rxjs';
import {ResponseModel} from '../model/response.model';
import {HttpClient} from '@angular/common/http';
import {StudentModel} from '../model/student.model';

@Injectable({
  providedIn: 'root'
})
export class LibrarianService {

  constructor(private httpClient: HttpClient) { }
  createLibrarian(addLibrarian: LibrarianModel): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>('http://localhost:8081/libMgmtSystem/create/Librarian/', addLibrarian);
  }
  getLibrarians(): Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>('http://localhost:8081/libMgmtSystem/librarians');
  }
  searchByName(name: string): Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>('http://localhost:8081/libMgmtSystem/search/librarian?name=' + name);
  }

  deleteLibrarian(id: number): Observable<ResponseModel>{
    return this.httpClient.delete<ResponseModel>('http://localhost:8081/libMgmtSystem/librarian/' + id);
  }


  updateLibrarian(updS: LibrarianModel[]): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>('http://localhost:8081/libMgmtSystem/update/librarian/', updS);
  }
}
