import { CountryMasterRoutingModule } from './country-master-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryMasterComponent } from './country-master.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CountryMasterRoutingModule,
    SharedModule
  ],
  declarations: [CountryMasterComponent]
})
export class CountryMasterModule { }
