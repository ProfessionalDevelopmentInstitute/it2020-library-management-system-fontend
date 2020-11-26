import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookModel} from '../../model/book.model';
import {ListService} from '../../service/list.service';
import {BookCategory} from '../../model/category.model';
import {Shelf} from '../../model/shelf.model';
import {CategoryService} from '../../service/category.service';
import {ShelfService} from '../../service/shelf.service';


declare var $: any;

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  closeResult: string;
  resData: BookModel[];
  idToDelete: number;
  idToUpdate: number;

  books: BookModel[];
  res: any;
  updateResult: any;
  result: BookCategory[];
  shelf: Shelf[];


  updateForm: FormGroup;

  constructor(public bookService: ListService, private modalService: NgbModal,
              private categoryService: CategoryService, private shelfService: ShelfService) {
    this.updateForm = new FormGroup({
      name: new FormControl('', Validators.required),
      author: new FormControl('', [Validators.required]),
      edition: new FormControl('', Validators.required),
      isbn: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      imgUrl: new FormControl('', Validators.required),
      categories: new FormControl('', Validators.required),
      shelves: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(
      value => {
        this.resData= value.result;
        console.log(value.result);
      }
    );
    this.categoryService.getBookCategory().subscribe(
      value => {
        this.result = value.result;
      }
    );
    this.shelfService.getShelves().subscribe(
      value => {
        this.shelf = value.result;
      }
    );
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  DeleteBook(){
    this.bookService.deleteBook(this.idToDelete)
      .subscribe(
        value => {
          console.log(value);
          this.bookService.getBooks().subscribe(value =>{
            this.books =value.result;
            console.log(value.message)
          })
        },
        error => console.log(error));
    console.log(this.idToDelete);
  }

  onDelete(close, id: number) {
    this.idToDelete = id;
    this.modalService.open(close, {ariaLabelledBy: 'deleteModal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  UpdateBook(): void {
    const up: BookModel = {
      id: this.idToUpdate,
      name: this.updateForm.value.name,
      author: this.updateForm.value.author,
      edition: this.updateForm.value.edition,
      isbn: this.updateForm.value.isbn,
      price: this.updateForm.value.price,
      imgUrl: this.updateForm.value.imgUrl,
      categories: this.result[this.updateForm.value.categories],
      shelves: this.shelf[this.updateForm.value.shelves]
    }
    this.res=up;
    console.log(this.idToUpdate);
    this.updateResult=up;
    this.bookService.updateBook(this.updateResult).subscribe(
      value => {
        value=this.updateResult;
        console.log(value);
      },
      error => {console.log(error)}
    );
  }

  onUpdate(update, upd: BookModel) {
    this.idToUpdate = upd.id;
    // this.category = cate.id;
    this.modalService.open(update, {ariaLabelledBy: 'updateModal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    console.log(this.idToUpdate);
    // this.updateForm.reset(this.idToUpdate);
    this.updateForm.reset(upd);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}

