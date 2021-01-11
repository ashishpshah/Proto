import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddEditItemRoutingModule } from './add-edit-item-routing.module';
import { AddEditItemComponent } from './add-edit-item.component';
import {SharedModule} from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgSelect2Module } from 'ng-select2';

@NgModule({

  imports: [
    CommonModule,
    AddEditItemRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgSelect2Module
  ] , declarations: [AddEditItemComponent]
})
export class AddEditItemModule { }
