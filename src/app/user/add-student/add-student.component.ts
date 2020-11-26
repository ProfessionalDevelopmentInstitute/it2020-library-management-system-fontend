import { Component, OnInit } from '@angular/core';
import {LibraryCardService} from '../../service/library-card.service';
import {LibraryCardModel} from '../../model/library-card.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  result: LibraryCardModel[];
  // addStudentFrom: FormGroup;
  constructor(private libraryService: LibraryCardService) {
    // this.addStudentFrom = new FormGroup({
    //   name: new FormControl('', Validators.required),
    //   email: new FormControl('', Validators.required),
    //   rollNo: new FormControl('', Validators.required),
    //   address: new FormControl('', Validators.required),
    //   phone: new FormControl('', Validators.required),
    //   dateOfBirth: new FormControl('', Validators.required),
    //   // password: new FormControl('', Validators.required),
    //   libraryCardId: new FormControl('', Validators.required),
    //
    // });
  }

  ngOnInit(): void {
    this.libraryService.getLibraryCard().subscribe(
      value => {
        this.result = value.result;
        console.log(value.message)
      }
    );
  }

}
