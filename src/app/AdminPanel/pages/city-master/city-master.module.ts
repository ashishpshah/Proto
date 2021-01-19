import { CityMasterRoutingModule } from './city-master-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityMasterComponent } from './city-master.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CityMasterRoutingModule,
    SharedModule
  ],
  declarations: [CityMasterComponent]
})
export class CityMasterModule { }
