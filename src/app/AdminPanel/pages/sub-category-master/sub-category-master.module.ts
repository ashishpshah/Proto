import { SubCategoryMasterRoutingModule } from './sub-category-master-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubCategoryMasterComponent } from './sub-category-master.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SubCategoryMasterRoutingModule,
    SharedModule
  ],
  declarations: [SubCategoryMasterComponent]
})
export class SubCategoryMasterModule { }
