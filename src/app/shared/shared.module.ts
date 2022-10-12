import { HttpClientModule } from '@angular/common/http';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    FormDebugComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule

  ],
  exports:[
    FormDebugComponent
  ]
})
export class SharedModule { }
