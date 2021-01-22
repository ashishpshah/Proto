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
        path: 'route-master',
        loadChildren: () => import('./route-list/route-list.module').then(m => m.RouteListModule)
      },
      {
        path: 'add-edit-route',
        loadChildren: () => import('./add-edit-route/add-edit-route.module').then(m => m.AddEditRouteModule)
      }
      ,{
        path: 'add-edit-route/:id',
        loadChildren: () => import('./add-edit-route/add-edit-route.module').then(m => m.AddEditRouteModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
   declarations: [
  ]
})
export class RouteMasterRoutingModule { }
