import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../service/category.service';

@Component({
  selector: 'app-shelf-one',
  templateUrl: './shelf-one.component.html',
  styleUrls: ['./shelf-one.component.css']
})
export class ShelfOneComponent implements OnInit {

  result: any;
  constructor(public bookCategory: CategoryService) { }

  ngOnInit(): void {
    this.bookCategory.getBookCategory().subscribe(
      value => {
        // this.result = value.result;
        console.log(value);
      },
      error => {}
    );
  }

}
