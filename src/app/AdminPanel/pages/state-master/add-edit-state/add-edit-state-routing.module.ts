import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditStateComponent } from './add-edit-state.component';

const routes: Routes = [
  {
    path: '',
    component: AddEditStateComponent,
    data: {
      breadcrumb: 'Add-Edit State',
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
export class AddEditStateRoutingModule { }
