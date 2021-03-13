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
        path: 'vehicle-route-time-detail',
        loadChildren: () => import('./vehicle-route-time-detail-list/vehicle-route-time-detail-list.module').then(m => m.VehicleRouteTimeDetailListModule)
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
export class VehicleRouteTimeDetailRoutingModule { }
