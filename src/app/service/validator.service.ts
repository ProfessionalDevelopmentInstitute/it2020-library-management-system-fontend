import {FormGroup, ValidationErrors} from '@angular/forms';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  public confirmPasswordValidator(formGroup: FormGroup): ValidationErrors {
    const password: string = formGroup.value.password;
    const confirmPassword: string = formGroup.value.confirmPassword;
    if (password !== confirmPassword){
      return { PasswordNotMergeError : true};
    }
    return null;
  }

}
