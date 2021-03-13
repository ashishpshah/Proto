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
        path: 'route-time-mgmt',
        loadChildren: () => import('./route-time-mgmt-list/route-time-mgmt-list.module').then(m => m.RouteTimeListModule)
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
export class RouteTimeRoutingModule { }
