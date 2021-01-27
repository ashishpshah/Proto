import { VehicleMasterRoutingModule } from './vehicle-master-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleMasterComponent } from './vehicle-master.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    VehicleMasterRoutingModule,
    SharedModule
  ],
  declarations: [VehicleMasterComponent]
})
export class VehicleMasterModule { }
