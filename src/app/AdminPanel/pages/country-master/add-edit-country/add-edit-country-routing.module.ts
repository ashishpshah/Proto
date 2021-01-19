import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditCountryComponent } from './add-edit-country.component';

const routes: Routes = [
  {
    path: '',
    component: AddEditCountryComponent,
    data: {
      breadcrumb: 'Add-Edit Country',
      icon: 'icofont-layout bg-c-blue',
      breadcrumb_caption: 'Add-Edit Country',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddEditCountryRoutingModule { }
