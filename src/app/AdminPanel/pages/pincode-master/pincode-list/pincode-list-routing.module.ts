import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PincodeListComponent } from './pincode-list.component';

const routes: Routes = [
  {
    path: '',
    component: PincodeListComponent,
    data: {
      breadcrumb: 'Allowed Pincode Master',
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
export class PincodeListRoutingModule { }
