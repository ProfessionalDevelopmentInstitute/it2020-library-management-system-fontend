import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../service/category.service';
import {BookCategory} from '../../model/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  bookCateG: BookCategory[];

  constructor(public categoryService: CategoryService) { }

  ngOnInit(): void {
    // this.bookCateG = this.categoryService.getBookCategory().subscribe(
    //   value => {
    //     this.bookCateG = value
    //     console.log(value);
    //   }
    // );
    this.categoryService.getBookCategory().subscribe(
      res => {
        this.bookCateG = res.result
        console.log(res);
        },
      error => {}
    );
  }

}
