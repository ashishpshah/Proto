import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditRouteComponent } from './add-edit-route.component';

const routes: Routes = [
  {
    path: '',
    component: AddEditRouteComponent,
    data: {
      breadcrumb: 'Add-Edit Route',
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
export class AddEditRouteRoutingModule { }
