import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditVehicleComponent } from './add-edit-vehicle.component';

const routes: Routes = [
  {
    path: '',
    component: AddEditVehicleComponent,
    data: {
      breadcrumb: 'Add-Edit Vehicle',
      icon: 'icofont-layout bg-c-blue',
      breadcrumb_caption: 'Add-Edit Vehicle',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddEditVehicleRoutingModule { }
