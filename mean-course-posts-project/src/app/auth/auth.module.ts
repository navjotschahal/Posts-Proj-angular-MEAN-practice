import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/shared/shared/shared.module';
import { ConfirmationComponent } from '../common/components/confirmation/confirmation.component';


@NgModule({
  declarations: [AuthComponent, SignupComponent, LoginComponent, ConfirmationComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
