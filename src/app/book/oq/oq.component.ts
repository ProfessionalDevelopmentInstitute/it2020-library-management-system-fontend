import { Component, OnInit } from '@angular/core';
import {Shelf} from '../../model/shelf.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ShelfService} from '../../service/shelf.service';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BookCategory} from '../../model/category.model';
import {OldQService} from '../../service/old-q.service';
import {OqModel} from '../../model/oq.model';

@Component({
  selector: 'app-oq',
  templateUrl: './oq.component.html',
  styleUrls: ['./oq.component.css']
})
export class OqComponent implements OnInit {
  result: OqModel[];
  p: Number = 1;
  addForm: FormGroup;
  updateForm: FormGroup;
  res: any;
  updateResult: any;
  closeResult: string;
  idToDelete: number;
  idToUpd: number;
  message: string;
  dMessage: string;
  uMessage: string;
  constructor(private oldService: OldQService, private router: Router, private modalService: NgbModal) {
    this.addForm = new FormGroup({
      subject: new FormControl('', Validators.required),
      pdfUrl: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      postedDate: new FormControl('', Validators.required)
    });
    this.updateForm = new FormGroup({
      subject: new FormControl('', Validators.required),
      pdfUrl: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      postedDate: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.oldService.getOQs().subscribe(
      value => {
        this.result = value.result;
      }
    );
  }

  SearchSub(): void{
    const subject = this.updateForm.value.subject;
    this.oldService.searchSubjectName(subject).subscribe(
      value => {
        this.result = value.result;
      }
    );
  }
  onSubmit(): void{
    const add: OqModel = {
      subject: this.addForm.value.subject,
      pdfUrl: this.addForm.value.pdfUrl,
      year: this.addForm.value.year,
      postedDate: this.addForm.value.postedDate
    };
    console.log(add);
    this.oldService.createOQ(add).subscribe(
      value => {
        setTimeout(() => {
          this.message = value.message;
        }, 10);
        console.log(value);
      }
    );
    this.router.navigate(['/dashboard/old/q'])
  }
  DeleteOq(){
    this.oldService.deleteOQ(this.idToDelete)
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

  UpdateOq(): void {
    const up: OqModel = {
      id: this.idToUpd,
      subject: this.updateForm.value.subject,
      pdfUrl: this.updateForm.value.pdfUrl,
      year: this.updateForm.value.year,
      postedDate: this.updateForm.value.postedDate
    }
    this.res=up;
    console.log(this.idToUpd);
    this.updateResult=up;
    console.log(up)
    this.oldService.updateOQ(this.updateResult).subscribe(
      value => {
        setTimeout(() => {
          this.uMessage = value.message;

        }, 10);
        console.log(value.result);
      },
      error => {console.log(error)},
      ()=>{console.log("Success!")}
    );
  }

  onUpdate(update, upd: OqModel) {
    this.idToUpd= upd.id;
    // this.category = cate.id;
    this.modalService.open(update, {ariaLabelledBy: 'updateModal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    console.log(this.idToUpd);
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
