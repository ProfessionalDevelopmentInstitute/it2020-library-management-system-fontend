import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LibraryCardService} from '../../../service/library-card.service';
import {ValidatorService} from '../../../service/validator.service';
import {StudentService} from '../../../service/student.service';
import {Router} from '@angular/router';
import {LibrarianModel, POSITION, ROLES} from '../../../model/librarian.model';
import {LibrarianService} from '../../../service/librarian.service';

@Component({
  selector: 'app-librarian-register',
  templateUrl: './librarian-register.component.html',
  styleUrls: ['./librarian-register.component.css']
})
export class LibrarianRegisterComponent implements OnInit {

  Roles = ROLES;
  position= POSITION;
  registerForm: FormGroup;
  constructor(private libraryService: LibraryCardService, private validatorService: ValidatorService,
               private router: Router, private librarianService: LibrarianService
              ) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', [Validators.required]),
      role: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      passwords: new FormGroup({
        password: new FormControl(null),
        confirmPassword: new FormControl(null)
      }, [Validators.required, this.validatorService.confirmPasswordValidator]),
    });
  }

  ngOnInit(): void {
  }
  onClick(): void {
    const lRegister: LibrarianModel = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      phone: this.registerForm.value.phone,
      address: this.registerForm.value.address,
      position: this.registerForm.value.position,
      password: this.registerForm.value.passwords.password,
      role: this.registerForm.value.role,
    };
    console.log(lRegister);
    this.librarianService.createLibrarian(lRegister).subscribe(
      value => {
        console.log(value);
      },
      error => {

      }
    );
    this.router.navigate(['login'])
  }

}
