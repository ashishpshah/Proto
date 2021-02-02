import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleRouteListComponent } from './vehicle-route-list.component';

const routes: Routes = [
  {
    path: '',
    component: VehicleRouteListComponent,
    data: {
      breadcrumb: 'Vehicle Route Master',
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
export class VehicleRouteListRoutingModule { }
