import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../service/category.service';
import {Router} from '@angular/router';
import {BookCategory} from '../../model/category.model';
import {BookModel} from '../../model/book.model';
import {ShelfService} from '../../service/shelf.service';
import {Shelf} from '../../model/shelf.model';
import {ListService} from '../../service/list.service';
import {ResponseModel} from '../../model/response.model';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  addBookForm: FormGroup;
  result: BookCategory[];
  shelf: Shelf[];
  message: string;
  constructor(private cateService: CategoryService, private router: Router,
              private shelfService: ShelfService, private listService: ListService) {

    this.addBookForm = new FormGroup({
      name: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      edition: new FormControl('', Validators.required),
      isbn: new FormControl('', Validators.required),
      imgUrl: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      categories: new FormControl('', Validators.required),
      shelves: new FormControl('', Validators.required),

    });
  }

  ngOnInit(): void {
    this.cateService.getBookCategory().subscribe(
      value => {
        this.result= value.result;
        console.log(value.result)
      }
    );
    this.shelfService.getShelves().subscribe(
      value => {
        this.shelf= value.result;
      }
    );
  }
  onSubmitt(): void{
    const addBook: BookModel = {
      name: this.addBookForm.value.name,
      author: this.addBookForm.value.author,
      edition: this.addBookForm.value.edition,
      imgUrl: this.addBookForm.value.imgUrl,
      price: this.addBookForm.value.price,
      isbn: this.addBookForm.value.isbn,
      categories: this.result[this.addBookForm.value.categories],
      shelves: this.shelf[this.addBookForm.value.shelves]
    };
    this.listService.createBook(addBook).subscribe(
      value => {
        console.log(value);
        this.message =value.message;
      },
      error => {
        console.log(error)
      },
      ()=>{}
    );
    this.router.navigate(['/book/list'])
  }


}

