import { AddEditVehicleRoutingModule } from './add-edit-vehicle-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditVehicleComponent } from './add-edit-vehicle.component';

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
    AddEditVehicleRoutingModule
  ],
  declarations: [AddEditVehicleComponent]
})
export class AddEditVehicleModule { }
