import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../service/category.service';
import {BookCategory} from '../../model/category.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ListService} from '../../service/list.service';
import {BookModel} from '../../model/book.model';

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
  constructor(public categoryService: CategoryService, private router: Router,
              public route: ActivatedRoute, private listService: ListService) { }

  ngOnInit(): void {
    // this.listService.getBooks().subscribe(
    //   value => {
    //     this.lists = value.result;
    //     console.log(value.result);
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

  onClick(id: number): void{
    this.idToCategoryId = id;
    console.log(id);
    this.categoryService.getCategoryId(id).subscribe(
      value => {
        this.cateId = value.result;
        console.log(this.cateId);
      }
    );
    this.router.navigate(['dashboard/book/category'])
  }

}
