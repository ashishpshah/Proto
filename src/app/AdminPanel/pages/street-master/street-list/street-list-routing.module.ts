import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StreetListComponent } from './street-list.component';

const routes: Routes = [
  {
    path: '',
    component: StreetListComponent,
    data: {
      breadcrumb: 'Street List',
      icon: 'icofont-layout bg-c-blue',
      breadcrumb_caption: 'Street List',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StreetListRoutingModule { }
