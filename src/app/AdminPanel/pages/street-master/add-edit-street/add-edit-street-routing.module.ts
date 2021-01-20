import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditStreetComponent } from './add-edit-street.component';

const routes: Routes = [
  {
    path: '',
    component: AddEditStreetComponent,
    data: {
      breadcrumb: 'Add-Edit Street',
      icon: 'icofont-layout bg-c-blue',
      breadcrumb_caption: 'Add-Edit Street',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddEditStreetRoutingModule { }
