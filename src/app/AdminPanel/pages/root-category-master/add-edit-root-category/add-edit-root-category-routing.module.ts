import { AddEditRootCategoryComponent } from './add-edit-root-category.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AddEditRootCategoryComponent,
    data: {
      breadcrumb: 'Add-Edit Root Category',
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
export class AddEditRootCategoryRoutingModule { }
