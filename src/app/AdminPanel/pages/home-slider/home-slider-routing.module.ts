import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Homepage Slider',
      icon: 'icofont-layout  bg-c-orange',
      breadcrumb_caption: '',
      status: true
    },
    children: [
      {
        path: 'home-slider',
        loadChildren: () => import('./home-slider-list/home-slider-list.module').then(m => m.HomeSliderListModule)
      }
    ]
  }
];



@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeSliderRoutingModule { }
