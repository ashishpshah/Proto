import { StateMasterRoutingModule } from './state-master-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateMasterComponent } from './state-master.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    StateMasterRoutingModule,
    SharedModule
  ],
  declarations: [StateMasterComponent]
})
export class StateMasterModule { }
