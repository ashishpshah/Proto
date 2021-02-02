import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityListComponent } from './city-list.component';

const routes: Routes = [
  {
    path: '',
    component: CityListComponent,
    data: {
      breadcrumb: 'City Master',
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
export class CityListRoutingModule { }
