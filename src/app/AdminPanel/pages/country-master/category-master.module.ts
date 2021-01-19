import { CategoryMasterRoutingModule } from './category-master-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryMasterComponent } from './category-master.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CategoryMasterRoutingModule,
    SharedModule
  ],
  declarations: [CategoryMasterComponent]
})
export class CategoryMasterModule { }
