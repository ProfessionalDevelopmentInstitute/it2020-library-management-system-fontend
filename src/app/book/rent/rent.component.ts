import { Component, OnInit } from '@angular/core';
import {RentService} from '../../service/rent.service';
import {RentModel, STATUS} from '../../model/rent.model';
import {BookModel} from '../../model/book.model';
import {LibrarianModel} from '../../model/librarian.model';
import {ListService} from '../../service/list.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LibraryCardModel} from '../../model/library-card.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {

  book: BookModel[];
  librarian: LibrarianModel[];
  rent: RentModel[];
  addRForm: FormGroup;
  idToUpdate: number;
  idToDelete: number;
  updateResult: any;
  res: any;
  closeResult: string;
  Status = STATUS;
  p: Number = 1;
  count: Number = 10;
  dMessage: string;
  uMessage: string;
  constructor(private rentService: RentService, private modalService: NgbModal, private bookService: ListService) {
    this.addRForm = new FormGroup({
      rentFromDate: new FormControl('', Validators.required),
      rentToDate: new FormControl('', [Validators.required]),
      returnDate: new FormControl('', Validators.required),
      fine: new FormControl('', [Validators.required]),
      status: new FormControl('', Validators.required),
      student: new FormControl('', Validators.required),
      book: new FormControl('', Validators.required),
      librarian: new FormControl('', Validators.required),
    });
  }
  SearchByName(): void{
    const student = this.addRForm.value.student;
    console.log(student);
    this.rentService.searchByName(student).subscribe(
      value => {
        this.rent = value.result;
        console.log(value.result);
      }
    );
  }
  ngOnInit(): void {
    this.rentService.getRentLists().subscribe(
      value => {
        this.rent = value.result;
        console.log(value.result)
      },
      error => {},
      ()=> {console.log('Success!')}
    );
  }

  UpdateRent(): void {
    const up: RentModel = {
      id: this.idToUpdate,
      rentFromDate: this.addRForm.value.rentFromDate,
      rentToDate: this.addRForm.value.rentToDate,
      returnDate: this.addRForm.value.returnDate,
      fine: this.addRForm.value.fine,
      status: this.addRForm.value.status,
      student: this.addRForm.value.student,
      book: this.addRForm.value.book,
      librarian: this.addRForm.value.librarian,
    }
    this.res=up;
    console.log(this.idToUpdate);
    this.updateResult=up;
    this.rentService.updateRent(this.updateResult).subscribe(
      value => {
        setTimeout(() => {
          this.uMessage = value.message;
        }, 10);
        console.log(value);
      },
      error => {console.log(error)},
      ()=>{console.log("Success!")}
    );
  }

  onUpdate(update, upd: RentModel) {
    this.idToUpdate = upd.id;
    // this.category = cate.id;
    this.modalService.open(update, {ariaLabelledBy: 'updateModal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    console.log(this.idToUpdate);
    // this.updateForm.reset(this.idToUpdate);
    this.addRForm.reset(upd);
  }

  DeleteRent(){
    this.rentService.deleteRent(this.idToDelete)
      .subscribe(
        value => {
          setTimeout(() => {
            this.dMessage = value.message;
          }, 10);
          console.log(value);
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
