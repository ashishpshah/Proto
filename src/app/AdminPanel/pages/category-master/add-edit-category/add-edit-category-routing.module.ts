import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditCategoryComponent } from './add-edit-category.component';

const routes: Routes = [
  {
    path: '',
    component: AddEditCategoryComponent,
    data: {
      breadcrumb: 'Add-Edit Category',
      icon: 'icofont-layout bg-c-blue',
      breadcrumb_caption: 'Add-Edit Category',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddEditCategoryRoutingModule { }
