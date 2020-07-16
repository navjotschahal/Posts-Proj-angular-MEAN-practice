import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StaticData } from 'src/assets/static-data/static.data';
import { PRIMITIVE_VALUE } from 'src/assets/constants/common-constants';
import * as SignUpFormData from './signup.component.json';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  staticDtata = StaticData;
  signUp = SignUpFormData;

  constructor( private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group(
      {
        userName: [ { value: PRIMITIVE_VALUE.null, disabled: PRIMITIVE_VALUE.false }, [ Validators.required, Validators.email ] ],
        password: [ { value: PRIMITIVE_VALUE.null, disabled: PRIMITIVE_VALUE.false }, [ Validators.required ] ]
      }
    );
  }

  onLogin() {
    console.log('SignUp form : ', this.signUpForm.value);
  }

}
