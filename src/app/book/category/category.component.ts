import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../service/category.service';
import {BookCategory} from '../../model/category.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ListService} from '../../service/list.service';
import {BookModel} from '../../model/book.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  bookCateG: BookCategory[];
  idToCategoryId: number;
  lists: BookModel[];
  cateId: BookCategory[];
  searchForm: FormGroup;
  bookLists: BookModel[];
  p: Number = 1;
  q: Number = 1;
  constructor(public categoryService: CategoryService, private router: Router,
              public route: ActivatedRoute, private listService: ListService,
              private bookService: ListService) {
    this.searchForm = new FormGroup({
      type: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(
      value => {
        this.lists = value.result
      }
    );
    this.categoryService.getBookCategory().subscribe(
      res => {
        this.bookCateG = res.result
        console.log(res);
        },
      error => {}
    );
  }
  SearchType(): void{
    const type = this.searchForm.value.type;
    console.log(type);
    this.categoryService.searchCateType(type).subscribe(
      value => {
        this.bookCateG = value.result;
      }
    );
  }

  onClick(id: number): void{
    this.idToCategoryId = id;
    console.log(id);
    this.bookService.getCategoryId(id).subscribe(
      value => {
        this.bookLists = value.result;
        console.log(value.result)
      }
    );
    // this.categoryService.getCategoryId(id).subscribe(
    //   value => {
    //     this.cateId = value.result;
    //     console.log(this.cateId);
    //   }
    // );
    this.router.navigate(['dashboard/book/category'])
  }

}
