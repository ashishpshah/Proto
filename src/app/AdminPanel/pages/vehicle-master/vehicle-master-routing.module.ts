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
        path: 'vehicle-master',
        loadChildren: () => import('./vehicle-list/vehicle-list.module').then(m => m.VehicleListModule)
      },
      // {
      //   path: 'add-edit-vehicle',
      //   loadChildren: () => import('./add-edit-vehicle/add-edit-vehicle.module').then(m => m.AddEditVehicleModule)
      // }
      // ,{
      //   path: 'add-edit-vehicle/:id',
      //   loadChildren: () => import('./add-edit-vehicle/add-edit-vehicle.module').then(m => m.AddEditVehicleModule)
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
   declarations: [
  ]
})
export class VehicleMasterRoutingModule { }
