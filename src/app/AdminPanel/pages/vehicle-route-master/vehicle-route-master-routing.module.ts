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
        path: 'vehicle-route-master',
        loadChildren: () => import('./vehicle-route-list/vehicle-route-list.module').then(m => m.VehicleRouteListModule)
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
export class VehicleRouteMasterRoutingModule { }
