import { Component, OnInit } from '@angular/core';
import {LoginManagerService} from '../../service/login-manager.service';
import {Subject} from 'rxjs';
import {StudentModel} from '../../model/student.model';
import {Router} from '@angular/router';
import {AuthModel} from '../../model/auth.model';
import {LibrarianModel} from '../../model/librarian.model';
import {FormControl, FormGroup} from '@angular/forms';
import {ListService} from '../../service/list.service';
import {BookModel} from '../../model/book.model';
import {LoginModel} from '../../model/login.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  studentModel: StudentModel;
  librarianModel: LibrarianModel;

  title = 'AngularHttpBasic';

  authModel: AuthModel;

  constructor(private loginManager: LoginManagerService, private router: Router) {}

  ngOnInit(): void {
    this.loginManager.isAuth.subscribe(value => {
      this.authModel = value;
    });
    this.loginManager.sessionSignIn();
  }

  logOut(): void {
    this.loginManager.logOut();
    this.router.navigate(['login']);
  }

  ngOnDestroy(): void {
    this.loginManager.isAuth.unsubscribe();
  }
}
