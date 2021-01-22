import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteListComponent } from './route-list.component';

const routes: Routes = [
  {
    path: '',
    component: RouteListComponent,
    data: {
      breadcrumb: 'Route List',
      icon: 'icofont-layout bg-c-blue',
      breadcrumb_caption: 'Route List',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouteListRoutingModule { }
