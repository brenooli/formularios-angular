import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './../shared/shared.module';
import { DataFormComponent } from './data-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    DataFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule
  ]
})
export class DataFormModule { }
