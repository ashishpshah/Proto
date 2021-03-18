import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleRouteTimeMapListComponent } from './vehicle-route-time-map-list.component';

const routes: Routes = [
  {
    path: '',
    component: VehicleRouteTimeMapListComponent,
    data: {
      breadcrumb: 'Vehicle Route Time Mapping',
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
export class VehicleRouteTimeMapListRoutingModule { }
