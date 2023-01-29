import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { StartComponent } from './components/pages/start/start.component';


@NgModule({
  declarations: [LoginComponent, SignupComponent, StartComponent],
  imports: [
    SharedModule,    
    AuthRoutingModule
  ]
})
export class AuthModule { }
