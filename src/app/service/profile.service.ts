import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginManagerService} from './login-manager.service';
import {Router} from '@angular/router';
import {LoginModel} from '../model/login.model';
import {LibraryCardModel} from '../model/library-card.model';
import {StudentModel} from '../model/student.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  sName: string;
  lName: string
  loginForm: FormGroup;
  email: string;
  name: string;
  address: string;
  phone: string;
  dateOfBirth: Date;
  position: string;
  rollNumber: string;
  id: number;
  constructor(private loginManger: LoginManagerService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }
  onClick(): void {
    const login: LoginModel = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    if(this.loginForm.value.type === 'student'){
      this.loginManger.studentSignIn(login).subscribe(
        value => {
          this.id = value.id;
          this.email= value.email;
          this.address = value.user.address;
          this.name = value.user.name;
          this.phone = value.user.phone;
          this.dateOfBirth = value.user.dateOfBirth;
          // this.rollNumber = value.libraryCard.rollNo;
          // console.log("rollNOOOOO" + value.libraryCard);
          this.router.navigate(['dashboard/home']);
        }
      );
    }
    if(this.loginForm.value.type === 'librarian'){
      this.loginManger.librarianSignIn(login).subscribe(
        value => {
          this.id = value.id;
          this.email = value.email;
          this.address = value.user.address;
          this.name = value.user.name;
          this.phone = value.user.phone;
          this.position = value.user.position;
          console.log(value.user.id, value.user.name)
          this.router.navigate(['dashboard/home']);
        }
      );
    }
    // console.log(this.loginForm.value);
  }
}
