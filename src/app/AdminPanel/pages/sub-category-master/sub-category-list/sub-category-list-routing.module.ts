import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubCategoryListComponent } from './sub-category-list.component';

const routes: Routes = [
  {
    path: '',
    component: SubCategoryListComponent,
    data: {
      breadcrumb: 'Sub Category Master',
      icon: 'icofont-layout  bg-c-orange',
      breadcrumb_caption: '',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubCategoryListRoutingModule { }
