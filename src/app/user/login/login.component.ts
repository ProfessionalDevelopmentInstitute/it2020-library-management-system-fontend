import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginModel} from '../../model/login.model';
import {LoginManagerService} from '../../service/login-manager.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private loginManger: LoginManagerService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }
  onClick(): void {
    const login: LoginModel = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.loginManger.signIn(login).subscribe(
      value => {
        this.router.navigate(['dashboard']);
      }
    );
    console.log(login);
}

}
