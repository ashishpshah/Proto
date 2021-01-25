import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { brandListComponent } from './brand-list.component';

const routes: Routes = [
  {
    path: '',
    component: brandListComponent,
    data: {
      breadcrumb: 'brand List',
      icon: 'icofont-layout bg-c-blue',
      breadcrumb_caption: 'brand List',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class brandListRoutingModule { }
