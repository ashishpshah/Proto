import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { typeListComponent } from './type-list.component';

const routes: Routes = [
  {
    path: '',
    component: typeListComponent,
    data: {
      breadcrumb: 'Type Master',
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
export class typeListRoutingModule { }
