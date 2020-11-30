import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginManagerService} from './service/login-manager.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularHttpBasic';
  //
  // isAuthenticated = false;
  // constructor(private loginManager: LoginManagerService, private router: Router) {
  // }
  //
  // ngOnInit(): void {
  //   this.loginManager.isAuth.subscribe(value => this.isAuthenticated = value);
  //   this.loginManager.sessionSignIn();
  // }
  //
  // logout(): void {
  //   this.loginManager.logOut();
  //   this.router.navigate(['login']);
  // }
  //
  // ngOnDestroy(): void {
  //   this.loginManager.isAuth.unsubscribe();
  // }
}
