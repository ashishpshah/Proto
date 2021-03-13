import { VehicleRouteTimeDetailRoutingModule } from './vehicle-route-time-detail-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleRouteTimeDetailComponent } from './vehicle-route-time-detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    VehicleRouteTimeDetailRoutingModule,
    SharedModule
  ],
  declarations: [VehicleRouteTimeDetailComponent]
})
export class VehicleRouteTimeDetailModule { }
