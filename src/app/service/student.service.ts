import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ResponseModel} from '../model/response.model';
import {HttpClient} from '@angular/common/http';
import {StudentModel} from '../model/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }

  getStudents(): Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>('http://localhost:8081/libMgmtSystem/students');
  }

  searchStudent(): Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>('http://localhost:8081/libMgmtSystem/search/student/' + name);
  }
  deleteStudent(id: number): Observable<ResponseModel>{
    return this.httpClient.delete<ResponseModel>('http://localhost:8081/libMgmtSystem/student/' + id);
  }

  createStudent(addStud: StudentModel): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>('http://localhost:8081/libMgmtSystem/create/student/', addStud);
  }
  updateStudent(updS: StudentModel[]): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>('http://localhost:8081/libMgmtSystem/student/update/', updS);
  }
}
