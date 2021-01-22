import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentListComponent } from './department-list.component';

const routes: Routes = [
  {
    path: '',
    component: DepartmentListComponent,
    data: {
      breadcrumb: 'Department Master',
      icon: 'icofont-layout bg-c-blue',
      breadcrumb_caption: '',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentListRoutingModule { }
