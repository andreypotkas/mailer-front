import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PrimengModule } from '../primeng/primeng.module';

@NgModule({
  declarations: [],
  imports: [],
  exports:[
      CommonModule,
	  FormsModule,
	  ReactiveFormsModule,
	  HttpClientModule,
	  RouterModule,
	  PrimengModule,
  ]
})
export class SharedModule { }
