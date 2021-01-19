import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditSubCategoryComponent } from './add-edit-sub-category.component';

const routes: Routes = [
  {
    path: '',
    component: AddEditSubCategoryComponent,
    data: {
      breadcrumb: 'Add-Edit Sub Category',
      icon: 'icofont-layout bg-c-blue',
      breadcrumb_caption: 'Add-Edit Sub Category',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddEditSubCategoryRoutingModule { }
