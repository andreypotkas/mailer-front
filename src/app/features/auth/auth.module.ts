import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { RecoveryComponent } from './components/pages/recovery/recovery/recovery.component';
import { ChangePasswordComponent } from './components/pages/recovery/change-password/change-password.component';


@NgModule({
  declarations: [LoginComponent, SignupComponent, RecoveryComponent, ChangePasswordComponent],
  imports: [
    SharedModule,    
    AuthRoutingModule
  ]
})
export class AuthModule { }
