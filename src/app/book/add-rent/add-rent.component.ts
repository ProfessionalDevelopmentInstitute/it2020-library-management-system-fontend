import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentModel} from '../../model/student.model';
import {RentModel, STATUS} from '../../model/rent.model';
import {Router} from '@angular/router';
import {RentService} from '../../service/rent.service';

@Component({
  selector: 'app-add-rent',
  templateUrl: './add-rent.component.html',
  styleUrls: ['./add-rent.component.css']
})
export class AddRentComponent implements OnInit {

  Status = STATUS;
  addRentForm: FormGroup;
  message: string;
  constructor(private router: Router, private rentService: RentService) {
    this.addRentForm = new FormGroup({
      rentFromDate: new FormControl('', Validators.required),
      rentToDate: new FormControl('', [Validators.required]),
      returnDate: new FormControl('', Validators.required),
      fine: new FormControl('', [Validators.required]),
      status: new FormControl('', Validators.required),
      student: new FormControl('', Validators.required),
      book: new FormControl('', Validators.required),
      librarian: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  onClick(): void {
    const rent: RentModel = {
      rentFromDate: this.addRentForm.value.rentFromDate,
      rentToDate: this.addRentForm.value.rentToDate,
      returnDate: this.addRentForm.value.returnDate,
      fine: this.addRentForm.value.fine,
      status: this.addRentForm.value.status,
      student: this.addRentForm.value.student,
      book: this.addRentForm.value.book,
      librarian: this.addRentForm.value.librarian,
    };
    console.log(rent);
    this.rentService.createRentList(rent).subscribe(
      value => {
        setTimeout(() => {
          this.message = value.message;
        }, 10);
        console.log(value);
      },
      error => {

      }
    );
    this.router.navigate(['rent/list'])
  }

}
