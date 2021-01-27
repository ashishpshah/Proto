import { typeMasterRoutingModule } from './type-master-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { typeMasterComponent } from './type-master.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    typeMasterRoutingModule,
    SharedModule
  ],
  declarations: [typeMasterComponent]
})
export class typeMasterModule { }
