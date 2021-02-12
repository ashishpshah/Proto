import { DriverMasterRoutingModule } from './driver-master-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverMasterComponent } from './driver-master.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DriverMasterRoutingModule,
    SharedModule
  ],
  declarations: [DriverMasterComponent]
})
export class DriverMasterModule { }
