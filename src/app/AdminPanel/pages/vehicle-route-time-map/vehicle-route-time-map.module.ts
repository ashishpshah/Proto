import { VehicleRouteTimeMapRoutingModule } from './vehicle-route-time-map-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleRouteTimeMapComponent } from './vehicle-route-time-map.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    VehicleRouteTimeMapRoutingModule,
    SharedModule
  ],
  declarations: [VehicleRouteTimeMapComponent]
})
export class VehicleRouteTimeMapModule { }
