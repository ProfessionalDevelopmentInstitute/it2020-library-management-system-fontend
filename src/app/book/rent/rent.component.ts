import { Component, OnInit } from '@angular/core';
import {RentService} from '../../service/rent.service';
import {RentModel} from '../../model/rent.model';
import {BookModel} from '../../model/book.model';
import {LibrarianModel} from '../../model/librarian.model';
import {ListService} from '../../service/list.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {

  book: BookModel[];
  librarian: LibrarianModel[];
  rent: RentModel[];
  constructor(private rentService: RentService, private bookService: ListService) { }

  ngOnInit(): void {
    this.rentService.getRentLists().subscribe(
      value => {
        this.rent = value.result;
        console.log(value.result)
      },
      error => {},
      ()=> {console.log('Success!')}
    );
    // this.bookService.getBooks().subscribe(
    //   value => {
    //     this.book = value.result;
    //   }
    // );
  }

}
