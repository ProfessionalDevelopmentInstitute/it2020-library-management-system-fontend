import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../service/profile.service';
import {SettingService} from '../../service/setting.service';
import {StudentModel} from '../../model/student.model';
import {CredentialpojoModel} from '../../model/credentialpojo.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidatorService} from '../../service/validator.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  closeResult: string;
  idToPass:number;
  updatePassword: FormGroup;
  res: CredentialpojoModel;
  updateResult: any;
  uMessage: string;
  constructor(public profileS: ProfileService,  private modalService: NgbModal ,
              public settingService: SettingService, private validatorService: ValidatorService) {
    this.updatePassword = new FormGroup({
      old_password: new FormControl('', Validators.required),
      passwords: new FormGroup({
        password: new FormControl(null),
        confirmPassword: new FormControl(null)
      }, [Validators.required, this.validatorService.confirmPasswordValidator]),
    });
  }

  ngOnInit(): void {
  }

  UpdatePassword(): void {
    const up: CredentialpojoModel = {
      id: this.profileS.id,
      old_password: this.updatePassword.value.old_password,
      password: this.updatePassword.value.passwords.password,
    }
    this.res=up;
    console.log();
    this.updateResult=up;
    this.settingService.updatePassword(this.updateResult).subscribe(
      value => {
        setTimeout(() => {
          this.uMessage = value.message;
        }, 10);
        console.log(value);
      },
      error => {console.log(error.message)}
    );
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
