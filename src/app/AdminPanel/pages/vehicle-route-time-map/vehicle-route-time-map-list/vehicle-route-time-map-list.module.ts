import { VehicleRouteTimeMapListRoutingModule } from './vehicle-route-time-map-list-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleRouteTimeMapListComponent } from './vehicle-route-time-map-list.component';

import {SharedModule} from '../../../shared/shared.module';
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
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgSelect2Module } from 'ng-select2';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatDatepickerModule, MatInputModule, MatNativeDateModule, MatFormFieldModule ,MAT_DATE_LOCALE} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    VehicleRouteTimeMapListRoutingModule
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
    NgSelectModule,
    NgSelect2Module,
    MatDatepickerModule, MatInputModule,MatNativeDateModule,MatFormFieldModule //Date Picker
  ],
  declarations: [VehicleRouteTimeMapListComponent]
})
export class VehicleRouteTimeMapListModule { }
