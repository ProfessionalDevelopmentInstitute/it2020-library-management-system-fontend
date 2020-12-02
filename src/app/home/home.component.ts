import { Component, OnInit } from '@angular/core';
import {ListService} from '../service/list.service';
import {BookModel} from '../model/book.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bookList: BookModel[];
  constructor(public bookService: ListService) { }

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
