import { Component, OnInit } from '@angular/core';
import {LibrarianService} from '../../service/librarian.service';
import {LibrarianModel, POSITION, ROLES} from '../../model/librarian.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidatorService} from '../../service/validator.service';
import {CredentialService} from '../../service/credential.service';
import {CredentialModel} from '../../model/credential.model';

@Component({
  selector: 'app-librarian-list',
  templateUrl: './librarian-list.component.html',
  styleUrls: ['./librarian-list.component.css']
})
export class LibrarianListComponent implements OnInit {

  Roles = ROLES;
  position = POSITION;
  res: any;
  updateResult: any;
  closeResult: string;
  idToDelete: number;
  idToUpdate: number;
  librarian: LibrarianModel[];
  credential: CredentialModel[];
  updateLForm: FormGroup;
  p : Number = 1;
  count: Number = 5;
  uMessage: string;
  dMessage: string;
  constructor(private librarianService: LibrarianService, private modalService: NgbModal,
              private validatorService: ValidatorService, private credentialService: CredentialService) {
    this.updateLForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', [Validators.required]),
      position: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  SearchByName(): void{
    const name = this.updateLForm.value.name;
    console.log(name);
    this.librarianService.searchByName(name).subscribe(
      value => {
        this.librarian = value.result;
        console.log(value.result);
      }
    );
  }
  ngOnInit(): void {
    // this.credentialService.getCredentials().subscribe(
    //   value => {
    //     this.credentialService = value.result.content
    //     console.log(value.result.content);
    //   }
    // );
    this.librarianService.getLibrarians().subscribe(
      value => {
        this.librarian= value.result;
        console.log(value.result);
      }
    );
  }
  UpdateLib(): void {
    const up: LibrarianModel = {
      id: this.idToUpdate,
      name: this.updateLForm.value.name,
      email: this.updateLForm.value.email,
      address: this.updateLForm.value.address,
      phone: this.updateLForm.value.phone,
      password: this.updateLForm.value.password,
      position: this.updateLForm.value.position,
      role: this.updateLForm.value.role
    }
    this.res=up;
    console.log(this.updateLForm.value.email);
    this.updateResult=up;
    this.librarianService.updateLibrarian(this.updateResult).subscribe(
      value => {
        setTimeout(() => {
          this.uMessage = value.message;
        }, 10);
        console.log(value);
      },
      error => {console.log(error.message)}
    );
  }

  onUpdate(update, upd: LibrarianModel) {
    this.idToUpdate = upd.id;
    // this.category = cate.id;
    this.modalService.open(update, {ariaLabelledBy: 'updateModal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    console.log(this.idToUpdate);
    // this.updateForm.reset(this.idToUpdate);
    this.updateLForm.reset(upd);
  }

  DeleteLib(): void{
    this.librarianService.deleteLibrarian(this.idToDelete).subscribe(
      value => {
        setTimeout(() => {
          this.dMessage = value.message;
        }, 10);
        console.log(value)
      }
    );
  }
  onDelete(close, id: number) {
    this.idToDelete = id;
    console.log(id)
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
