import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddEditRootHeaderComponent } from './add-edit-root-header.component';
import { AddEditRootHeaderRoutingModule } from './add-edit-root-header-routing.module';

import {SharedModule} from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgSelect2Module } from 'ng-select2';

@NgModule({
  imports: [
    CommonModule,
    AddEditRootHeaderRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgSelect2Module
  ],
  declarations: [AddEditRootHeaderComponent]
})
export class AddEditRootHeaderModule { }
