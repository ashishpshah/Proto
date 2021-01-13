import { CheckpincodeRoutes } from './checkpincode.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckpincodeComponent } from './checkpincode.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CheckpincodeRoutes
  ],
  declarations: [CheckpincodeComponent]
})
export class CheckpincodeModule { }
