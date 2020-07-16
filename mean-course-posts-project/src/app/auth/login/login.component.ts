import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StaticData } from 'src/assets/static-data/static.data';
import { PRIMITIVE_VALUE } from 'src/assets/constants/common-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  staticDtata = StaticData;

  constructor( private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        userName: [ { value: PRIMITIVE_VALUE.null, disabled: PRIMITIVE_VALUE.false }, [ Validators.required, Validators.email ] ],
        password: [ { value: PRIMITIVE_VALUE.null, disabled: PRIMITIVE_VALUE.false }, [ Validators.required ] ]
      }
    );
  }

  onLogin() {
    console.log('Login form : ', this.loginForm.value);
  }

}
