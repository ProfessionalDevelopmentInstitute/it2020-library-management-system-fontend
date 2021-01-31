import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../service/category.service';
import {Shelf} from '../../model/shelf.model';
import {ShelfService} from '../../service/shelf.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookCategory} from '../../model/category.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shelf-one',
  templateUrl: './shelf-one.component.html',
  styleUrls: ['./shelf-one.component.css']
})
export class ShelfOneComponent implements OnInit {

  result: Shelf[];
  p: Number = 1;
  addForm: FormGroup;
  updateForm: FormGroup;
  res: any;
  updateResult: any;
  closeResult: string;
  idToDelete: number;
  idToUpdate: number;
  message: string;
  dMessage: string;
  uMessage: string;
  constructor(private shelfService: ShelfService, private router: Router, private modalService: NgbModal) {
    this.addForm = new FormGroup({
      id: new FormControl('', Validators.required),
      room: new FormControl('', Validators.required)
    });
    this.updateForm = new FormGroup({
      id: new FormControl('', Validators.required),
      room: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.shelfService.getShelves().subscribe(
      value => {
        this.result = value.result;
      }
    );
  }
  SearchRoom(): void{
    const room = this.updateForm.value.room;
    this.shelfService.searchRoomName(room).subscribe(
      value => {
        this.result = value.result;
      }
    );
  }
  onSubmit(): void{
    const add: Shelf = {
      id: this.addForm.value.id,
      room: this.addForm.value.room
    };
    console.log(add);
    this.shelfService.createShelf(add).subscribe(
      value => {
        setTimeout(() => {
          this.message = value.message;
        }, 10);
        console.log(value);
      }
    );
    this.router.navigate(['/dashboard/shelf/list'])
  }
  DeleteShelf(){
    this.shelfService.deleteShelf(this.idToDelete)
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

  UpdateShelf(): void {
    const up: Shelf = {
      id: this.idToUpdate,
      room: this.updateForm.value.room,
    }
    this.res=up;
    console.log(this.idToUpdate);
    this.updateResult=up;
    this.shelfService.updateShelf(this.updateResult).subscribe(
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

  onUpdate(update, upd: Shelf) {
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
