import { RootHeaderListComponent } from './root-header-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RootHeaderListComponent,
    data: {
      breadcrumb: 'Root Header List',
      icon: 'icofont-layout bg-c-blue',
      breadcrumb_caption: 'Root Header List',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RootHeaderListRoutingModule { }
