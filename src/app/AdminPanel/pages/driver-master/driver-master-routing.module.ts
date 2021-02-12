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
        path: 'driver-master',
        loadChildren: () => import('./driver-list/driver-list.module').then(m => m.DriverListModule)
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
export class DriverMasterRoutingModule { }
