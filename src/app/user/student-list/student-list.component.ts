import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../service/student.service';
import {ROLE, StudentModel} from '../../model/student.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookModel} from '../../model/book.model';
import {LibraryCardModel} from '../../model/library-card.model';
import {CredentialModel} from '../../model/credential.model';
import {ValidatorService} from '../../service/validator.service';
import {CredentialService} from '../../service/credential.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  user:any;

  closeResult: string;
  idToDelete: number;
  idToUpdate: number;
  idToUserById: number;
  updateStudForm: FormGroup;
  student: StudentModel[];
  result: LibraryCardModel[];
  cre: CredentialModel[];
  res: any;
  roles = ROLE;
  updateResult: any;
  Name: string;
  rollNo: string;
  phone: string;
  dateOfBirth: Date;
  address: string;
  name: StudentModel['name'];
  inputForm: FormGroup;
  p: Number = 1;
  count: Number = 5;
  constructor(private studentService: StudentService, private modalService: NgbModal ,
              private validatorService: ValidatorService, private credentialService: CredentialService) {
    this.updateStudForm = new FormGroup({
      libraryCard: new FormControl('', Validators.required),
      name: new FormControl('', [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.inputForm = new FormGroup({
      name: new FormControl(null)
    })
  }

  ngOnInit(): void {
    // this.credentialService.getUserById(this.idToUserById).subscribe(
    //   value => {
    //     this.cre = value.result;
    //     console.log(value.result);
    //   }
    // );
    this.studentService.getStudents().subscribe(
      value => {
        this.student= value.result.content;
        console.log(value.result);
      }
    );

  }
  clicker(): void{
    const name = this.inputForm.value.name;
    console.log(name);
   this.studentService.searchStudent(name).subscribe(
     value => {
       this.student = value.result;
     }
   );
  }


  DeleteStud(): void{
    this.studentService.deleteStudent(this.idToDelete).subscribe(
      value => {
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

  UpdateStudent(): void {
    const up: StudentModel = {
      id: this.idToUpdate,
      name: this.updateStudForm.value.name,
      email: this.updateStudForm.value.email,
      address: this.updateStudForm.value.address,
      phone: this.updateStudForm.value.phone,
      dateOfBirth: this.updateStudForm.value.dateOfBirth,
      password: this.updateStudForm.value.password,
      role: this.updateStudForm.value.role,
      libraryCard: this.updateStudForm.value.libraryCard,
    }
    this.res=up;
    console.log(this.updateStudForm.value.email);
    this.updateResult=up;
    this.studentService.updateStudent(this.updateResult).subscribe(
      value => {
        value=this.updateResult;
        console.log(value);
      },
      error => {console.log(error.message)}
    );
  }

  onUpdate(update, upd: StudentModel) {
    this.idToUpdate = upd.id;
    this.idToUserById = upd.id;
    // this.category = cate.id;
    this.modalService.open(update, {ariaLabelledBy: 'updateModal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.credentialService.getUserById(this.idToUserById).subscribe(
      value => {
        this.cre = value.result;
        console.log(value.result);
      }
    );
    console.log(this.idToUpdate);
    console.log(this.idToUserById);
    // this.updateForm.reset(this.idToUpdate);
    this.updateStudForm.reset({
      id: upd.id,
      name: upd.name,
      role: upd.role,
      email: upd.email,
      dateOfBirth: upd.dateOfBirth,
      address: upd.address,
      phone: upd.phone,
      libraryCard: upd.libraryCard.rollNo
    });
  }

  open(content, stud: StudentModel) {
    this.idToUpdate = stud.id;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.Name = stud.name;
    this.rollNo = stud.libraryCard.rollNo;
    this.address = stud.address;
    this.dateOfBirth = stud.dateOfBirth;
    this.phone = stud.phone;
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
