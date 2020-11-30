import { Component, OnInit } from '@angular/core';
import {LoginManagerService} from '../../service/login-manager.service';
import {Subject} from 'rxjs';
import {StudentModel} from '../../model/student.model';
import {Router} from '@angular/router';
import {AuthModel} from '../../model/auth.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuth: Subject<AuthModel> = new Subject<AuthModel>();
  studentModel: StudentModel;
  credential: string;
  title = 'AngularHttpBasic';

  isAuthenticated = false;
  constructor(private loginManager: LoginManagerService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginManager.isAuth.subscribe(value => this.isAuthenticated = value);
    this.loginManager.sessionSignIn();
  }
  public logOut(): void {
    this.isAuth.next();
    this.credential = null;
    this.studentModel = null;
    localStorage.clear();
  }
  logout(): void {
    this.loginManager.logOut();
    this.router.navigate(['login']);
  }

  ngOnDestroy(): void {
    this.loginManager.isAuth.unsubscribe();
  }
}
