import { RouteMasterRoutingModule } from './route-master-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteMasterComponent } from './route-master.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouteMasterRoutingModule,
    SharedModule
  ],
  declarations: [RouteMasterComponent]
})
export class RouteMasterModule { }
