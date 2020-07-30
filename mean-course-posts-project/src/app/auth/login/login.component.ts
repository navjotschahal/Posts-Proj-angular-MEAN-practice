import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StaticData } from 'src/assets/static-data/static.data';
import { PRIMITIVE_VALUE } from 'src/assets/constants/common-constants';
import { AuthService } from '../services/auth.service';
import { AuthData } from '../interfaces/auth.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public staticDtata: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
    ) {
      this.staticDtata = StaticData;
    }

  ngOnInit(): void {
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.loginForm = this.fb.group(
      {
        [StaticData.loginFormData.loginFormCtrl.userName]:
          [ { value: PRIMITIVE_VALUE.null, disabled: PRIMITIVE_VALUE.false }, [ Validators.required, Validators.email ] ],
        [StaticData.loginFormData.loginFormCtrl.password]:
          [ { value: PRIMITIVE_VALUE.null, disabled: PRIMITIVE_VALUE.false }, [ Validators.required ] ]
      }
    );
  }

  onLogin() {
    if (this.loginForm.invalid) { return; }
    const loginFomVal: AuthData = this.loginForm.value;
    console.log('Login form : ', loginFomVal);
    this.authService.login(loginFomVal.userName, loginFomVal.password);
  }

}
