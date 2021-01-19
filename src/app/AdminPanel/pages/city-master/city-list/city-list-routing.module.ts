import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityListComponent } from './city-list.component';

const routes: Routes = [
  {
    path: '',
    component: CityListComponent,
    data: {
      breadcrumb: 'City List',
      icon: 'icofont-layout bg-c-blue',
      breadcrumb_caption: 'City List',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityListRoutingModule { }
