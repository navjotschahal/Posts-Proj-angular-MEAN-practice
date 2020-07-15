import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StaticData } from 'src/assets/static-data/static.data';

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
        userName: [ { value: null, disabled: false }, [ Validators.required, Validators.email ] ],
        password: [ { value: null, disabled: false }, [ Validators.required ] ]
      }
    );
  }

  onLogin() {

  }

}
