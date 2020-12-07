import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../service/category.service';
import {BookCategory} from '../../../model/category.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LibraryCardModel} from '../../../model/library-card.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  updateForm: FormGroup;
  res: any;
  updateResult: any;
  closeResult: string;
  idToDelete: number;
  idToUpdate: number;
  addForm: FormGroup;
  category: BookCategory[];
  p: Number = 1;
  count: Number = 10;
  constructor(private cateService: CategoryService, private categoryService: CategoryService,
              private router: Router, private modalService: NgbModal,) {
    this.addForm = new FormGroup({
      type: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    this.updateForm = new FormGroup({
      type: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }
  SearchTyp(): void{
    const type = this.updateForm.value.type;
    console.log(type);
    this.categoryService.searchCateType(type).subscribe(
      value => {
        this.category = value.result;
      }
    );
  }

  ngOnInit(): void {
    this.categoryService.getBookCategory().subscribe(
      value => {
        this.category = value.result.content;
      }
    );
  }
  onSubmit(): void{
    const add: BookCategory = {
      type: this.addForm.value.type,
      description: this.addForm.value.description
    };
    console.log(add);
    this.cateService.createBookCategory(add).subscribe(
      value => {
        console.log(value);
      }
    );
    this.router.navigate(['/dashboard/category/list'])
  }
  DeleteCategory(){
    this.categoryService.deleteCategory(this.idToDelete)
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
    const up: BookCategory = {
      id: this.idToUpdate,
      type: this.updateForm.value.type,
      description: this.updateForm.value.description,
    }
    this.res=up;
    console.log(this.idToUpdate);
    this.updateResult=up;
    this.categoryService.updateCategories(this.updateResult).subscribe(
      value => {
        console.log(value);
      },
      error => {console.log(error)},
      ()=>{console.log("Success!")}
    );
  }

  onUpdate(update, upd: BookCategory) {
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
  // open(content, libC: LibraryCardModel) {
  //   this.idToUpdate = libC.id;
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  //   this.name = libC.name;
  //   this.rollNo = libC.rollNo;
  //   this.year = libC.year;
  //   this.logoUrl = libC.logoUrl;
  //   this.updateForm.reset(libC);
  // }

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
