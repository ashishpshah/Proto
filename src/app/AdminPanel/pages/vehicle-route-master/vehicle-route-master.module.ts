import { VehicleRouteMasterRoutingModule } from './vehicle-route-master-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleRouteMasterComponent } from './vehicle-route-master.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    VehicleRouteMasterRoutingModule,
    SharedModule
  ],
  declarations: [VehicleRouteMasterComponent]
})
export class VehicleRouteMasterModule { }
