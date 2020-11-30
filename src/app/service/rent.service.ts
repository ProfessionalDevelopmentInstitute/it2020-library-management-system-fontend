import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseModel} from '../model/response.model';
import {LibraryCardModel} from '../model/library-card.model';
import {RentModel} from '../model/rent.model';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  constructor(private httpClient: HttpClient) { }
  getRentLists(): Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>('http://localhost:8081/libMgmtSystem/rents');
  }

  createRentList(addRent: RentModel): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>('http://localhost:8081/libMgmtSystem/create/rent/', addRent);
  }

  deleteRent(id: number): Observable<ResponseModel>{
    return this.httpClient.delete<ResponseModel>('http://localhost:8081/libMgmtSystem/rent/' + id);
  }

  updateRent(updateRent: RentModel[]): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>('http://localhost:8081/libMgmtSystem/update/rent/', updateRent);
  }
}
