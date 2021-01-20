import { NgSelectModule } from '@ng-select/ng-select';
import { NgSelect2Module } from 'ng-select2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminModuleComponent } from './admin-module.component';

import {SharedModule} from '../shared/shared.module';
import {NgxDataTableModule} from "angular-9-datatable";
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule} from 'primeng/progressbar';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
  imports: [
    CommonModule,
    ,SharedModule
    ,NgxDataTableModule
    ,TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelect2Module,
    NgSelectModule,
  ],
  declarations: [AdminModuleComponent]
})
export class AdminModuleModule { }
