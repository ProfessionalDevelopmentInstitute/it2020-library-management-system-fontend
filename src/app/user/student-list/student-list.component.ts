import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../service/student.service';
import {StudentModel} from '../../model/student.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  closeResult: string;
  idToDelete: number;
  result: StudentModel[];
  student: StudentModel[];
  constructor(private studentService: StudentService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe(
      value => {
        this.result= value.result;
        console.log(value.result);
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
