import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeSliderRoutingModule } from './home-slider-routing.module';
import { SharedModule } from 'primeng/api';
import { HomeSliderComponent } from './home-slider.component';

@NgModule({
  imports: [
    CommonModule,
    HomeSliderRoutingModule,
    SharedModule
  ],
  declarations: [
    HomeSliderComponent
  ]
})
export class HomeSliderModule { }
