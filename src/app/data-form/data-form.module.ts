import { DataFormComponent } from './data-form.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    DataFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class DataFormModule { }
