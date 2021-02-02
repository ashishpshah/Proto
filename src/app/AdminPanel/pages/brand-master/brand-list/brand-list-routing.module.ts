import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { brandListComponent } from './brand-list.component';

const routes: Routes = [
  {
    path: '',
    component: brandListComponent,
    data: {
      breadcrumb: 'Brand Master',
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
export class brandListRoutingModule { }
