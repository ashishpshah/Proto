import { VehicleListRoutingModule } from './vehicle-list-routing.module';
import { NgModule , NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleListComponent } from './vehicle-list.component';

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
// import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDatepickerModule, MatInputModule, MatNativeDateModule, MatFormFieldModule ,MAT_DATE_LOCALE} from '@angular/material';

// import { OwlDateTimeModule, OwlNativeDateTimeModule,OWL_DATE_TIME_LOCALE  } from 'ng-pick-datetime';
// import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// export const MY_MOMENT_FORMATS = {
//   parseInput: 'l LT',
//   fullPickerInput: 'l LT',
//   datePickerInput: 'l',
//   timePickerInput: 'LT',
//   monthYearLabel: 'MMM YYYY',
//   dateA11yLabel: 'LL',
//   monthYearA11yLabel: 'MMMM YYYY',
// };

@NgModule({
  // providers: [
  //   {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  // ],
  imports: [
    CommonModule,
    VehicleListRoutingModule
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
    NgSelect2Module

    ,MatDatepickerModule, MatInputModule,MatNativeDateModule,MatFormFieldModule //Date Picker

    //,OwlDateTimeModule,OwlNativeDateTimeModule,OwlMomentDateTimeModule,//BrowserAnimationsModule
  ],
  declarations: [VehicleListComponent]
})
export class VehicleListModule { }
