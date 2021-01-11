import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddEditItemComponent} from './add-edit-item.component';

const routes: Routes = [
  {
    path: '',
    component: AddEditItemComponent,
    data: {
      breadcrumb: 'Add Item',
      icon: 'icofont-layout bg-c-blue',
      breadcrumb_caption: 'Item Add',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddEditItemRoutingModule { }
