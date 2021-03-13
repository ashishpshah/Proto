import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteTimeListComponent } from './route-time-mgmt-list.component';

const routes: Routes = [
  {
    path: '',
    component: RouteTimeListComponent,
    data: {
      breadcrumb: 'Route Time Management',
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
export class RouteTimeListRoutingModule { }
