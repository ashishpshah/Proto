import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditCityComponent } from './add-edit-city.component';

const routes: Routes = [
  {
    path: '',
    component: AddEditCityComponent,
    data: {
      breadcrumb: 'Add-Edit City',
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
export class AddEditCityRoutingModule { }
