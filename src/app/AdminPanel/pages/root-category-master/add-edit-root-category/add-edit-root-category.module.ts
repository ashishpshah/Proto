import { AddEditRootCategoryRoutingModule } from './add-edit-root-category-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditRootCategoryComponent } from './add-edit-root-category.component';

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
    AddEditRootCategoryRoutingModule
  ],
  declarations: [AddEditRootCategoryComponent]
})
export class AddEditRootCategoryModule { }
