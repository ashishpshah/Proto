import { DepartmentMasterRoutingModule } from './department-master-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentMasterComponent } from './department-master.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DepartmentMasterRoutingModule,
    SharedModule
  ],
  declarations: [DepartmentMasterComponent]
})
export class DepartmentMasterModule { }
