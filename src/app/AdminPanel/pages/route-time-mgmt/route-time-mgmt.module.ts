import { RouteTimeRoutingModule } from './route-time-mgmt-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteTimeComponent } from './route-time-mgmt.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouteTimeRoutingModule,
    SharedModule
  ],
  declarations: [RouteTimeComponent]
})
export class RouteTimeModule { }
