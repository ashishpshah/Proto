import { AddEditRootHeaderComponent } from './add-edit-root-header.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AddEditRootHeaderComponent,
    data: {
      breadcrumb: 'Add-Edit Root Header',
      icon: 'icofont-layout bg-c-blue',
      breadcrumb_caption: 'Add-Edit Root Header',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddEditRootHeaderRoutingModule { }
