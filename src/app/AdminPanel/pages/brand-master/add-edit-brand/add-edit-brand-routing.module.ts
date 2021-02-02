import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditbrandComponent } from './add-edit-brand.component';

const routes: Routes = [
  {
    path: '',
    component: AddEditbrandComponent,
    data: {
      breadcrumb: 'Add-Edit brand',
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
export class AddEditbrandRoutingModule { }
