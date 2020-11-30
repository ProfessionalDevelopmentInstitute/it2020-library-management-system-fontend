import { Injectable } from '@angular/core';
import {LibrarianModel} from '../model/librarian.model';
import {Observable} from 'rxjs';
import {ResponseModel} from '../model/response.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LibrarianService {

  constructor(private httpClient: HttpClient) { }
  createLibrarian(addLibrarian: LibrarianModel): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>('http://localhost:8081/libMgmtSystem/create/Librarian/', addLibrarian);
  }
}
