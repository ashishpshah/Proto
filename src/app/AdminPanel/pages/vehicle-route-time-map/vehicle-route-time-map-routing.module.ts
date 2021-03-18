import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Master',
      status: false
    },
    children: [
      {
        path: 'vehicle-route-time-map',
        loadChildren: () => import('./vehicle-route-time-map-list/vehicle-route-time-map-list.module').then(m => m.VehicleRouteTimeMapListModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
   declarations: [
  ]
})
export class VehicleRouteTimeMapRoutingModule { }
