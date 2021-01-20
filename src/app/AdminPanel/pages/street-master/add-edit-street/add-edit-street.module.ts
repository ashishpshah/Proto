import { AddEditStreetRoutingModule } from './add-edit-street-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditStreetComponent } from './add-edit-street.component';

import {SharedModule} from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgSelect2Module } from 'ng-select2';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgSelect2Module,
    AddEditStreetRoutingModule
  ],
  declarations: [AddEditStreetComponent]
})
export class AddEditStreetModule { }
