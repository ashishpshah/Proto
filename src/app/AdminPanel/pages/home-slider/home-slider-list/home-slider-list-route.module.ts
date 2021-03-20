import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeSliderListComponent } from './home-slider-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeSliderListComponent,
    data: {
      breadcrumb: 'Homepage Slider',
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
export class HomeSliderListRouteModule { }
