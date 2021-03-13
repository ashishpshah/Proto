import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleRouteTimeDetailListComponent } from './vehicle-route-time-detail-list.component';

const routes: Routes = [
  {
    path: '',
    component: VehicleRouteTimeDetailListComponent,
    data: {
      breadcrumb: 'Vehicle Route Time Detail',
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
export class VehicleRouteTimeDetailListRoutingModule { }
