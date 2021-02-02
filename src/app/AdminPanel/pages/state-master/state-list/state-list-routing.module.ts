import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StateListComponent } from './state-list.component';

const routes: Routes = [
  {
    path: '',
    component: StateListComponent,
    data: {
      breadcrumb: 'State Master',
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
export class StateListRoutingModule { }
