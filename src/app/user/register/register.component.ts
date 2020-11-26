import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LibraryCardService} from '../../service/library-card.service';
import {LibraryCardModel} from '../../model/library-card.model';
import {ROLE, StudentModel} from '../../model/student.model';
import {ValidatorService} from '../../service/validator.service';
import {StudentService} from '../../service/student.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  result: LibraryCardModel[];
  registerForm: FormGroup;
  roles = ROLE;
  constructor(private libraryService: LibraryCardService,
              private validatorService: ValidatorService, private studentService: StudentService, private router: Router) {
    this.registerForm = new FormGroup({
      libraryCardRollNo: new FormControl('', Validators.required),
      name: new FormControl('', [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      rollNo: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', [Validators.required]),
      dOfBirth: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      passwords: new FormGroup({
        password: new FormControl(null),
        confirmPassword: new FormControl(null)
      }, [Validators.required, this.validatorService.confirmPasswordValidator]),
    });
  }

  ngOnInit(): void {
    this.libraryService.getLibraryCard().subscribe(
      value => {
        this.result = value.result;
        console.log(value.message)
      }
    );
  }

  onClick(): void {
    const register: StudentModel = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      phone: this.registerForm.value.phone,
      rollNo: this.registerForm.value.rollNo,
      address: this.registerForm.value.address,
      dateOfBirth: this.registerForm.value.dOfBirth,
      password: this.registerForm.value.passwords.password,
      role: this.registerForm.value.role,
      libraryCardRollNo: this.registerForm.value.libraryCardRollNo
    };
    console.log(register);
    this.studentService.createStudent(register).subscribe(
      value => {
        console.log(value);
      },
      error => {

      }
    );
    this.router.navigate(['login'])
  }

}


