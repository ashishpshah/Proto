import { PincodeMasterRoutingModule } from './pincode-master-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PincodeMasterComponent } from './pincode-master.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    PincodeMasterRoutingModule,
    SharedModule
  ],
  declarations: [PincodeMasterComponent]
})
export class PincodeMasterModule { }
