import { Component, OnInit } from '@angular/core';
import {ListService} from '../service/list.service';
import {BookModel} from '../model/book.model';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bookList: BookModel[];
  p: Number = 1;
  searchForm: FormGroup;
  constructor(public bookService: ListService) {
    this.searchForm = new FormGroup({
      name: new FormControl(null),
      author: new FormControl(''),
      edition: new FormControl('')
    })
  }
  search(): void{
    const name = this.searchForm.value.name;
    const author= this.searchForm.value.author;
    const edition = this.searchForm.value.edition;
    console.log(name);
    this.bookService.searchBookName(name).subscribe(
      value => {
        this.bookList = value.result;
      }
    );

  }


  ngOnInit(): void {
    this.bookService.getBooks().subscribe(
      value => {
        this.bookList = value.result;
      },
      error => {},
      ()=> {}
    );
  }

}
