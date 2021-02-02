import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleListComponent } from './vehicle-list.component';

const routes: Routes = [
  {
    path: '',
    component: VehicleListComponent,
    data: {
      breadcrumb: 'Vehicle Master',
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
export class VehicleListRoutingModule { }
