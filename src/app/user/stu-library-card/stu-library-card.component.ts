import { Component, OnInit } from '@angular/core';
import {LibraryCardModel} from '../../model/library-card.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LibraryCardService} from '../../service/library-card.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-stu-library-card',
  templateUrl: './stu-library-card.component.html',
  styleUrls: ['./stu-library-card.component.css']
})
export class StuLibraryCardComponent implements OnInit {

  closeResult: string;
  idToDelete: number;
  idToUpdate: number;
  idToView: number;
  result: LibraryCardModel[];
  addLForm: FormGroup;
  updateForm: FormGroup;
  res: any;
  updateResult: any;
  name: string;
  rollNo: string;
  year: string;
  logoUrl: string;
  // private page: number=0;
  // items = [];
  // pageOfItems: Array<any>;
  message: string;
  size: number;
  pageNumber: number;
  p: Number = 1;
  // count: Number = 5;
  constructor(private libraryCService: LibraryCardService, private modalService: NgbModal, private router: Router) {

    this.addLForm = new FormGroup({
      name: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      rollNo: new FormControl('', Validators.required),
      logoUrl: new FormControl('', Validators.required),
    });
    this.updateForm = new FormGroup({
      name: new FormControl('', Validators.required),
      rollNo: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      logoUrl: new FormControl('', Validators.required)
    });
  }

  SearchByRollNo(): void{
    const rollNo = this.addLForm.value.rollNo;
    console.log(rollNo);
    this.libraryCService.searchByRollNo(rollNo).subscribe(
      value => {
        this.result = value.result;
        console.log(value.result);
      }
    );
  }

  ngOnInit(): void {
    this.libraryCService.getLibraryCard().subscribe(
      value => {
        this.result = value.result;
        console.log(value.message)
      }
    );
  }

  onSubmit(): void{
    const addLCard: LibraryCardModel = {
      name: this.addLForm.value.name,
      rollNo: this.addLForm.value.rollNo,
      year: this.addLForm.value.year,
      logoUrl: this.addLForm.value.logoUrl
    };
    console.log(addLCard);
    this.libraryCService.createLibraryCard(addLCard).subscribe(
      value => {
        // this.message = value.message;
        setTimeout(() => {
          this.message = value.message
          alert(value.message);
        }, 3000);
        console.log(value);
      }
    );
    this.router.navigate(['/dashboard/student/library/card'])
  }
  DeleteLibCard(){
    this.libraryCService.deleteLibCard(this.idToDelete)
      .subscribe(
        value => {
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

  UpdateLibCard(): void {
    const up: LibraryCardModel = {
      id: this.idToUpdate,
      name: this.updateForm.value.name,
      rollNo: this.updateForm.value.rollNo,
      year: this.updateForm.value.year,
      logoUrl: this.updateForm.value.logoUrl
    }
    this.res=up;
    console.log(this.idToUpdate);
    this.updateResult=up;
    this.libraryCService.updateLibCard(this.updateResult).subscribe(
      value => {
        console.log(value);
      },
      error => {console.log(error)},
      ()=>{console.log("Success!")}
    );
  }

  onUpdate(update, upd: LibraryCardModel) {
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
  open(content, libC: LibraryCardModel) {
    this.idToUpdate = libC.id;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.name = libC.name;
    this.rollNo = libC.rollNo;
    this.year = libC.year;
    this.logoUrl = libC.logoUrl;
    this.updateForm.reset(libC);
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
