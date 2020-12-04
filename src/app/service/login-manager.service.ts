import {Injectable} from '@angular/core';
import {StudentModel} from '../model/student.model';
import {Observable, Subject} from 'rxjs';
import {LoginModel} from '../model/login.model';
import {tap} from 'rxjs/operators';
import {LoginService, TYPE} from './login.service';
import {LibrarianModel} from '../model/librarian.model';
import {AuthModel} from '../model/auth.model';

@Injectable({
  providedIn: 'root'
})
export class LoginManagerService {

  isAuth: Subject<AuthModel> = new Subject<AuthModel>();

  isLib: LibrarianModel;
  isSt: StudentModel;

  studentModel: StudentModel;
  librarianModel: LibrarianModel;
  credential: string;

  constructor(private loginService: LoginService) {
  }

  public studentSignIn(login: LoginModel): Observable<StudentModel> {
    return this.loginService.signIn(login, TYPE.Student).pipe(
      tap(value => {
        this.credential = this.loginService.encrypt(login);
        localStorage.setItem('student', JSON.stringify(value));
        localStorage.setItem('credential', this.credential);
        this.isAuth.next({isAuthenticated: true, isSt: true, isLib: false});
      })
    );
  }

  public librarianSignIn(login: LoginModel): Observable<LibrarianModel> {
    return this.loginService.signIn(login, TYPE.Librarian).pipe(
      tap(value => {
        this.credential = this.loginService.encrypt(login);
        localStorage.setItem('librarian', JSON.stringify(value));
        localStorage.setItem('credential', this.credential);
        this.isAuth.next({isAuthenticated: true, isSt: false, isLib: true});
      })
    );
  }

  public sessionSignIn(): boolean {
    if (localStorage.hasOwnProperty('credential')) {
      this.credential = localStorage.getItem('credential');

      if(localStorage.hasOwnProperty('student')){
        this.studentModel = JSON.parse(localStorage.getItem('student'));
        this.isAuth.next({isAuthenticated: true, isSt: true, isLib: false});
      }

      if(localStorage.hasOwnProperty('librarian')){
        this.librarianModel = JSON.parse(localStorage.getItem('librarian'));
        this.isAuth.next({isAuthenticated: true, isSt: false, isLib: true});
      }
      return true;
    }
    return false;
  }


  public logOut(): void {
    this.isAuth.next({isAuthenticated: false, isSt: false, isLib: false});
    this.credential = null;
    this.studentModel = null;
    this.librarianModel = null;
    localStorage.clear();
  }
}
