import {Injectable} from '@angular/core';
import {StudentModel} from '../model/student.model';
import {Observable, Subject} from 'rxjs';
import {LoginModel} from '../model/login.model';
import {tap} from 'rxjs/operators';
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginManagerService {

  isAuth: Subject<boolean> = new Subject<boolean>();

  studentModel: StudentModel;
  credential: string;

  constructor(private loginService: LoginService) {}

  public signIn(login: LoginModel): Observable<StudentModel> {
    return this.loginService.signIn(login).pipe(
      tap(value => {
        // this.studentModel = value;
        this.credential = this.loginService.encrypt(login);
        localStorage.setItem('student', JSON.stringify(value));
        localStorage.setItem('credential', this.credential);
        this.isAuth.next(true);
      })
    );
  }


  public sessionSignIn(): boolean {
    if (localStorage.hasOwnProperty('student') && localStorage.hasOwnProperty('credential')) {
      this.studentModel = JSON.parse(localStorage.getItem('student'));
      this.credential = localStorage.getItem('credential');
      this.isAuth.next(true);
      return true;
    }
    return false;
  }

  public logOut(): void {
    this.isAuth.next(false);
    this.credential = null;
    this.studentModel = null;
    localStorage.clear();
  }
}
