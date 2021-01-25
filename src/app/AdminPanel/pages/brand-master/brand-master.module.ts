import { brandMasterRoutingModule } from './brand-master-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { brandMasterComponent } from './brand-master.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    brandMasterRoutingModule,
    SharedModule
  ],
  declarations: [brandMasterComponent]
})
export class brandMasterModule { }
