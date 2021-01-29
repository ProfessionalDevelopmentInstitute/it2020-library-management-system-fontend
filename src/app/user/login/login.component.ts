import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginModel} from '../../model/login.model';
import {LoginManagerService} from '../../service/login-manager.service';
import {Router} from '@angular/router';
import {ProfileService} from '../../service/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // sName: string;
  // lName: string
  // loginForm: FormGroup;
  // constructor(private loginManger: LoginManagerService, private router: Router) {
  //   this.loginForm = new FormGroup({
  //     email: new FormControl('', [Validators.required, Validators.email]),
  //     password: new FormControl('', Validators.required),
  //     type: new FormControl('', Validators.required)
  //   });
  // }
  constructor(public pService: ProfileService) {
  }

  ngOnInit(): void {
    this.pService.onClick();
    this.pService.loginForm;
  }
//   onClick(): void {
//     const login: LoginModel = {
//       email: this.loginForm.value.email,
//       password: this.loginForm.value.password
//     };
//     if(this.loginForm.value.type === 'student'){
//       this.loginManger.studentSignIn(login).subscribe(
//         value => {
//           console.log(value.email)
//           this.router.navigate(['dashboard/home']);
//         }
//       );
//     }
//     if(this.loginForm.value.type === 'librarian'){
//       this.loginManger.librarianSignIn(login).subscribe(
//         value => {
//           console.log(value.role)
//           console.log(value.id)
//           this.router.navigate(['dashboard/home']);
//         }
//       );
//     }
//     // console.log(this.loginForm.value);
// }

}
