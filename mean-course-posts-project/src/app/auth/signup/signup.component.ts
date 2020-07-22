import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StaticData } from 'src/assets/static-data/static.data';
import { PRIMITIVE_VALUE } from 'src/assets/constants/common-constants';
import { AuthService } from '../services/auth.service';
import { AuthData } from '../interfaces/auth.interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  staticDtata = StaticData;

  constructor( private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group(
      {
        [StaticData.signUpFormData.formCtrl.userName]:
          [ { value: PRIMITIVE_VALUE.null, disabled: PRIMITIVE_VALUE.false }, [ Validators.required, Validators.email ] ],
        [StaticData.signUpFormData.formCtrl.password]:
          [ { value: PRIMITIVE_VALUE.null, disabled: PRIMITIVE_VALUE.false }, [ Validators.required ] ]
      }
    );
  }

  onSignUp(): void {
    if (this.signUpForm.invalid) { return; }
    console.log('SignUp form : ', this.signUpForm.value);
    const signUpFormVal: AuthData = this.signUpForm.value;
    this.authService.createUser(signUpFormVal.userName, signUpFormVal.password);tor
  }

}
