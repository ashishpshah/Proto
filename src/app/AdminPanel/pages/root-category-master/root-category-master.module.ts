import { RootCategoryMasterRoutingModule } from './root-category-master-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RootCategoryMasterComponent } from './root-category-master.component';

@NgModule({
  imports: [
    CommonModule,
    RootCategoryMasterRoutingModule,
    SharedModule
  ],
  declarations: [RootCategoryMasterComponent]
})
export class RootCategoryMasterModule { }
