import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteListComponent } from './route-list.component';

const routes: Routes = [
  {
    path: '',
    component: RouteListComponent,
    data: {
      breadcrumb: 'Route Master',
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
export class RouteListRoutingModule { }
