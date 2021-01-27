import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { typeListComponent } from './type-list.component';

const routes: Routes = [
  {
    path: '',
    component: typeListComponent,
    data: {
      breadcrumb: 'type List',
      icon: 'icofont-layout bg-c-blue',
      breadcrumb_caption: 'type List',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class typeListRoutingModule { }
