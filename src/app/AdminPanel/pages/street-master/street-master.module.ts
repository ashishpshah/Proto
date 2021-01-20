import { StreetMasterRoutingModule } from './street-master-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreetMasterComponent } from './street-master.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    StreetMasterRoutingModule,
    SharedModule
  ],
  declarations: [StreetMasterComponent]
})
export class StreetMasterModule { }
